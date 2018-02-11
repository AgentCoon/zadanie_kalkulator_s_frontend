import React, { Component } from 'react';
import CountryList from './CountryList';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            dailyRate: '',
            selectedCountry: 'PL',
            calculatedAmount: '?',
            calculatedCurrency: '',
            valid: false
        };

        this.handleSelectedCountryChange = this.handleSelectedCountryChange.bind(this);
        this.handleDailyRateChange = this.handleDailyRateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/countries').then(results => {
            return results.json();
        }).then(data => {
            this.setState({countries: data})
        });
    }

    handleSelectedCountryChange(event) {
        this.setState({selectedCountry: event.target.value})
    }

    validateForm() {
        const form = document.getElementById('calculator-form');
        return form.checkValidity();
    }

    handleDailyRateChange(event) {
        this.setState({
            dailyRate: event.target.value,
            valid: this.validateForm()
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/calculate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                countryCode: this.state.selectedCountry,
                amount: this.state.dailyRate,
            })
        }).then(result => {
            return result.json();
        }).then(data => {
            this.setState({
                calculatedAmount: data.amount,
                calculatedCurrency: data.currency
            })
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h1>Monthly net income calculator</h1>
                        <form id="calculator-form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="countries">Choose a country</label>
                                <CountryList handler={this.handleSelectedCountryChange} countries={this.state.countries}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dailyrate">Enter daily rate</label>
                                <input value={this.state.dailyRate} onChange={this.handleDailyRateChange} type="number" className="form-control" name="amount" id="dailyrate" placeholder="e.g. 500" step="0.01" min="0" required/>
                            </div>
                            <button type="submit" disabled={!this.state.valid} className="btn btn-primary" onClick={this.handleSubmit}>Calculate</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <hr/>
                        <p>Your monthly income: <strong>{this.state.calculatedAmount} {this.state.calculatedCurrency}</strong></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

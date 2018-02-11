import React, { Component } from 'react';
import Country from './Country';

class CountryList extends Component {
    render() {

        let countries = this.props.countries.map(country =>
            <Country key={country.countryCode} country={country}/>
        );

        return (
            <select onChange={this.props.handler} className="form-control" id="countries">
                {countries}
            </select>
        )
    }
}

export default CountryList;

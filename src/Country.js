import React, { Component } from 'react';

class Country extends Component {
    render() {
        return (
            <option value={this.props.country.countryCode}>{this.props.country.name} ({this.props.country.currency})</option>
        )
    }
}

export default Country;

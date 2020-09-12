import React, {Component} from 'react';

import {countries} from 'countries-list';
const accents = require('remove-accents');

/*
BQ, Bonaire: "599",
BV, Bouvet Island: remove
CC, Cocos [Keeling] Islands: 891
CW, Curacao: 599(9)
DO, Dominican Republic: 1
HM, Heard Island and McDonald Islands: remove,
KZ, Kazakhstan: 7
SJ, Svalbard and Jan Mayen: 47
VA, Vatican City: 379
XK, Kosovo: 383
*/

export default class SelectPhoneCodes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneCode: props.phoneCode,
            phoneCountry: props.phoneCountry
        };
    }

    componentWillMount() {
        if (!this.state.phoneCountry) {
            for (let countryCode in countries) {
                if (countryCode === "BV" || countryCode === "HM") {
                    continue;
                }

                if (parseInt(this.getPhoneCode(countryCode)) === this.props.phoneCode) {
                    this.setState({
                        phoneCountry: countryCode
                    });
                    break;
                }
            }
        }
    }

    getPhoneCode = countryCode => {
        let phoneCode = countries[countryCode].phone;

        if (countryCode === "BQ" || countryCode === "CW") {
            phoneCode = "599";
        }

        if (countryCode === "CC") {
            phoneCode = "891";
        }

        if (countryCode === "DO") {
            phoneCode = "1";
        }

        if (countryCode === "KZ") {
            phoneCode = "7";
        }

        if (countryCode === "SJ") {
            phoneCode = "47";
        }

        if (countryCode === "VA") {
            phoneCode = "379";
        }

        if (countryCode === "XK") {
            phoneCode = "383";
        }

        if (phoneCode.length > 3) {
            phoneCode = "1";
        }

        return phoneCode;
    };

    getFlagImage = countryCode => (
        "<img width='30' height='auto' src='../../assets/images/flags_small/" + accents.remove(countries[countryCode].name).replace(/ /g, "_").toLowerCase() + ".gif'/>"
    );

    getCountryList = () => {
        let result = [];
        let j = 0;

        for (let countryCode in countries) {
            if (countryCode === "BV" || countryCode === "HM") {
                continue;
            }

            result.push(
                <option
                    key={j++}
                    value={countryCode}
                >{`${countries[countryCode].name}|${this.getPhoneCode(countryCode)}`}</option>
            );
        }

        return result;
    };

    checkNumeric = () => {
        const phoneField = this.refs.phoneInput;
        if (phoneField.value) {
            phoneField.value = phoneField.value.toString().match(/[0-9]/g).reduce((a, b) => (a + b), "");
        }
    };

    updatePhoneCode = (e) => {
        this.setState({
            phoneCode: parseInt(this.getPhoneCode(e.target.value)),
            phoneCountry: e.target.value
        });
    };

    render() {
        console.log(this.state);

        return (
            <div className="form-group">
                <label htmlFor="phone" className="d-block">
                    Phone
                </label>

                <div className="ga-posr">
                    <div className="ga-custom-flag d-flex justify-content-center align-items-center">
                        <select
                            className="form-control phonepicker"
                            name="phoneCountry"
                            value={this.state.phoneCountry}
                            onChange={this.updatePhoneCode}
                        >
                            {this.getCountryList()}
                        </select>

                        <input type="hidden" name="phoneCode" value={this.state.phoneCode} readOnly/>

                        <input
                            ref="phoneInput"
                            type="text"
                            name="phone"
                            className="form-control ga-custom-phone-input border-0"
                            defaultValue={this.props.phone}
                            onChange={this.checkNumeric}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

import React from 'react';
import Toggle from 'material-ui/Toggle';
import {countries} from 'countries-list';

const accents = require('remove-accents');

const SelectCountries = ({accredited, citizenship, residence}) => {
    const getCountryList = () => {
        let result = [];
        Object.keys(countries).forEach(function (countryCode, index) {
            result.push(
                <option
                    key={index}
                    value={countryCode}
                >{countries[countryCode].name}</option>
            );
        });
        return result;
    };

    return (
        <div className="form-group">
            <div className="ga-posr">
                <div className="justify-content-center align-items-center">
                    <label htmlFor="residence" className="d-block">Country of residence:</label>
                    <select
                        className="form-control countrypicker"
                        id="residence"
                        name="residence"
                        defaultValue={residence}
                    >
                        {getCountryList()}
                    </select>

                    <div className="ga-custom-flag"/>
                </div>

                <div className="justify-content-center align-items-center">
                    <label htmlFor="citizenship" className="d-block">Country of citizenship:</label>
                    <select
                        className="form-control countrypicker"
                        id="citizenship"
                        name="citizenship"
                        defaultValue={citizenship}
                    >
                        {getCountryList()}
                    </select>
                </div>

                <div className="custom-checkbox ml-1 mt-3 d-flex justify-content-start">
                    <Toggle label="" name="accredited" defaultToggled={accredited} />
                    <span>US Accredited Investor</span>
                </div>
            </div>
        </div>
    );
};

export default SelectCountries;

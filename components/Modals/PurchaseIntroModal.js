import React, {Component} from 'react';
import ReactModal from 'react-modal';
import countries from 'country-list';

import {customStyles} from '../../constants/Helpers';

export default class PurchaseIntroModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: !props.closed,
            residence: "0",
            citizenship: "0",
            showError: false,
            error: ""
        };
    }

    closeModal = () => {
        const {residence, citizenship} = this.state;

        if (residence === "0") {
            this.setState({
                showError: true,
                error: "Please select residence."
            });
            return;
        }

        if (citizenship === "0") {
            this.setState({
                showError: true,
                error: "Please select citizenship."
            });
            return;
        }

        this.setState({
            isOpen: false,
            showError: false,
            error: ""
        });

        this.props.updateUserProfile({
            residence: residence.toLowerCase(),
            citizenship: citizenship.toLowerCase()
        });
    };

    countryList = () => {
        let result = [];
        countries().getNames().forEach(function (countryName, index) {
            result.push(
                <option key={index} value={countries().getCode(countryName)}>{countryName}</option>
            );
        });

        return result;
    };

    changeResidence = (e) => {
        this.setState({
            residence: e.target.value,
        });
    };

    changeCitizenship = (e) => {
        this.setState({
            citizenship: e.target.value,
        });
    };

    render() {
        return (
            <ReactModal
                isOpen={this.state.isOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="inform-modal">
                    <h5 className="mx-3 secondary text-center">IMPORTANT</h5>

                    <p>
                        Due to both jurisdictional specific and internal compliance and regulatory guidelines
                        we are unable to accept contributions from US residents, residents or citizens of OFAC
                        and/or FAFT Sanctioned or Black Listed countries  and residents or citizens of countries
                        that deem contributing to a token sale as unlawful or otherwise require some form of
                        local registration, regulation, or licensing.
                    </p>

                    <div className="d-md-flex justify-content-center align-items-center">
                        <label htmlFor="residence" className="m-0">Residence:</label>
                        <select
                            className="form-control country-list ml-md-2"
                            onChange={(e) => this.changeResidence(e)}
                            value={this.state.residence}
                        >
                            <option value={0}>Select ...</option>
                            {this.countryList()}
                        </select>
                    </div>

                    <div className="mt-2 d-md-flex justify-content-center align-items-center">
                        <label htmlFor="citizenship" className="m-0">Citizenship:</label>
                        <select
                            className="form-control country-list ml-md-2"
                            id="citizenship"
                            onChange={(e) => this.changeCitizenship(e)}
                            value={this.state.citizenship}
                        >
                            <option value={0}>Select ...</option>
                            {this.countryList()}
                        </select>
                    </div>

                    {this.state.showError && (
                        <div className="form-group my-2">
                            <span className="text-danger">{this.state.error}</span>
                        </div>
                    )}

                    <button className="btn btn-round primary white-color" onClick={() => this.closeModal()}>
                        OK, I UNDERSTAND
                    </button>
                </div>
            </ReactModal>
        );
    }
}

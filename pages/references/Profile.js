import React, {Component} from 'react';
import {connect} from 'react-redux';
import formSerialize from 'form-serialize';
const accents = require('remove-accents');

import {KycActions} from '../../redux/app/actions';
import SelectCountries from '../../components/Profile/SelectCountries';
import SelectPhoneCodes from '../../components/Profile/SelectPhoneCodes';

let SHA3 = require('crypto-js/sha3');

class ReferenceProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateStatus: "",
            updateSuccess: true,
            validAddress: true
        };
    }

    componentWillMount() {
        this.props.verifyChecking({
            token: this.props.userToken,
            cb: null
        });
    }

    componentDidMount() {
        const formatCountry = state => {
            // if (!state.id) {
            //  return state.text;
            // }

            return $("<img width='30' height='auto' src='../../assets/images/flags_small/"
            + accents.remove(state.text).replace(/ /g, "_").toLowerCase() + ".gif'/>"
            + "<span class='pl-2'>" + state.text + "</span>");
          };


        const formatPhone = state => {
            // if (!state.id) {
            //  return state.text;
            // }
            const splitText = state.text.split('|');

            return $("<img width='30' height='auto' src='../../assets/images/flags_small/"
            + accents.remove(splitText[0]).replace(/ /g, "_").toLowerCase() + ".gif'/>"
            + "<span class='pl-2'>" + state.id + " (+" + splitText[1] + ")</span>");
          };

        $('.countrypicker').select2({
            templateResult: formatCountry,
            templateSelection: formatCountry
        });
        $('.phonepicker').select2({
            templateResult: formatPhone,
            templateSelection: formatPhone
        });
    }



    onSubmit = (e) => {
        e.preventDefault();

        let data = formSerialize(e.target, {hash: true});
        if (data.ethAddress && !this.isAddress(data.ethAddress.trim())) {
            this.setState({
                validAddress: false
            });
            return false;
        } else {
            this.setState({
                validAddress: true
            });
        }

        this.setState({
            updateStatus: "",
            updateSuccess: false
        });

        this.props.updateProfile({
            data,
        }).then(() => {
            this.setState({
                updateStatus: "Profile is updated successfully.",
                updateSuccess: true
            });
        }).catch(error => {
            this.setState({
                updateStatus: error && error.message,
                updateSuccess: false
            });
        });
    };

    isAddress = (address) => {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // Check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            // Otherwise check each case
            return this.isChecksumAddress(address);
        }
    };

    isChecksumAddress = (address) => {
        // Check each case
        address = address.replace('0x', '');
        let addressHash = this.sha3(address.toLowerCase());

        for (let i = 0; i < 40; i++) {
            // The nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
                (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    };

    sha3 = (value) => {
        return SHA3(value, {
            outputLength: 256
        }).toString();
    };

    render() {
        return (
            <form id="profileForm" method="POST" onSubmit={this.onSubmit}>
                <div className="ga-sec-content">
                    <div className="row">
                        <div className="col-md-12 ga-sc-title">
                            <h1>Update Profile</h1>
                            <button type="submit" className="btn btn-round primary">SAVE<b className="hidden-sm-down"> CHANGES</b></button>
                            <button type="reset" className="ml-1 btn btn-round primary">RESET<b className="hidden-sm-down"> CHANGES</b></button>
                        </div>

                        <div className={"col-md-12 text-center " + (this.state.updateSuccess ? "text-success" : "text-danger")}>
                            {this.state.updateStatus}
                        </div>
                    </div>

                    <div className="row ga-auth" id="ga-auth-settings">
                        <div className="col-md-6 p-30">
                            <div className="ga-sec-auth-title">
                                <span>Personal Information</span>
                            </div>

                            {/*<div className="form-group">
                                <label htmlFor="username">Username</label>
                                <div className="ga-posr">
                                    <input type="text" className="form-control" name="username" defaultValue={this.props.userData.username}/>
                                </div>
                            </div>*/}

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="firstname">Full Name</label>
                                        <div className="ga-posr">
                                            <input type="text" name="firstname" className="form-control" placeholder="First Name"
                                                   defaultValue={this.props.userData.firstname} readOnly={!!this.props.userData.firstname}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="lastname">&nbsp;</label>
                                        <div className="ga-posr">
                                            <input type="text" name="lastname" className="form-control" placeholder="Last Name"
                                                   defaultValue={this.props.userData.lastname} readOnly={!!this.props.userData.lastname}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <SelectCountries
                                residence={this.props.userData.residence}
                                citizenship={this.props.userData.citizenship}
                                accredited={this.props.userData.accredited}
                            />

                            {this.props.kycStatus === "success"
                                ? (<b>VERIFICATION SUCCESSFUL!</b>)
                                : (
                                    <div className="row d-flex justify-content-center">
                                        <a href="#/kyc" className="btn btn-round primary">
                                            <b className="text-white">
                                                {this.props.kycStatus === "none" ? "GET VERIFIED!" : "CHECK VERIFICATION STATUS!"}
                                            </b>
                                        </a>
                                    </div>
                                )
                            }
                        </div>

                        <div className="col-md-6 p-30">
                            <div className="ga-sec-auth-title">
                                <span>Balance Information</span>
                            </div>

                            <div className="d-flex flex-column justify-content-center">
                                <div className="position-relative p-5 border-purple-3 border-radius-1">
                                    <img className="warning" src="/assets/images/warning.png"/>
                                    <div className="text-small font-weight-medium color-purple-1 text-justify">
                                        <span className="text-warning">ATTENTION:&nbsp;</span>
                                        Regardless of how you are making your purchase an ETH wallet is needed to link to the smart
                                        contract that is in control of the COIN (PSRC) token distribution. This wallet will be where
                                        we'll distribute your COIN should you choose to withdraw it from our platform once it has
                                        been minted and is ready for distribution, shortly following the close of our main token sale
                                        in late March of 2018. <b>Do not register a wallet address from an exchange</b> (Kraken,
                                        Poloniex, Coinbase, etc.) Be sure to enter the address of a wallet that allows you to be interact
                                        with ERC20 token contracts such as
                                        &nbsp;<a href="https://www.myetherwallet.com/" target="_blank"><b>EtherWallet</b></a>,&nbsp;
                                        <a href="https://www.parity.io/" target="_blank"><b>Parity</b></a>&nbsp;or&nbsp;
                                        <a href="https://metamask.io/" target="_blank"><b>MetaMask</b></a>.
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="eth_address">ETH Address</label>
                                <div className="ga-posr">
                                    <input type="text" className="form-control" name="ethAddress" defaultValue={this.props.userData.ethAddress}/>
                                    <span className={"text-danger" + (this.state.validAddress ? " hidden-xs-up" : "")}>
                                        Invalid Ethereum Address
                                    </span>
                                </div>
                            </div>

                            <br/>

                            <div className="ga-sec-auth-title m-t-10">
                                <span>Contact Information</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="ga-posr">
                                    <input type="email" className="form-control" name="email" disabled defaultValue={this.props.userData.email}/>
                                </div>
                            </div>

                            <SelectPhoneCodes phoneCode={this.props.userData.phoneCode} phoneCountry={this.props.userData.phoneCountry} phone={this.props.userData.phone}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        kycStatus: state.kycReducer.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyChecking: (req) => dispatch(KycActions.verifyChecking(req.token, req.cb))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceProfile);

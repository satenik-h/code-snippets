import React, {Component} from 'react';
// import $ from 'jquery';
import formSerialize from 'form-serialize';
let api_url = process.env.REACT_APP_API_URI;


class ReferenceSecurity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authy: 
            {
                ...this.props.authy,
                qrcode: false
            },
            updateStatus: "",
            updateSuccess: true
        };
    }

    toggleChange = (type) => {
        let { authy } = this.state;
        const data = {
            option: type,
            operation: !authy[type]
        };

        const p = (type === "qrcode" ?
            Promise.resolve() : this.props.update2FA({ data }));

        p.then(() => {
            authy[data.option] = data.operation;

            this.setState({
                authy
            });
        });
    };

    enableVoiceLogin = () => {
        console.log('Enable Voice Login');
    };

    showHidePassword = (id) => {
        if ($('#' + id).next().hasClass("ga-psh-active")) {
            $('#' + id).next().removeClass("ga-psh-active");
            $("#" + id).attr("type", "password");
        } else {
            $('#' + id).next().addClass("ga-psh-active");
            $("#" + id).attr("type", "text");
        }
    };

    authyOptions = () => {
        const AuthyOptions = [
            {code: "login", text: "Sign in"},
            {code: "profile", text: "Profile update"},
            {code: "password", text: "Password update"},
            {code: "operations", text: "Transaction approval"},
            {code: "qrcode", text: "Show QR code"},
        ];

        const result = [];
        AuthyOptions.forEach(opt => {
            result.push(
                <div key={opt.code} className={`col ${(this.state.authy[opt.code]) ? 'ga-sw-active' : ''}`}
                     onClick={() => this.toggleChange(opt.code)}>
                    <span>{opt.text}</span>
                    {
                        (opt.code === 'qrcode') ?
                            <div className="ga-auth-arrow">
                                <span className="show-desktop">→</span>
                                <span className="show-mobile">↓</span>
                            </div>
                            :
                            <div className="ga-auth-sw">
                                <div className={`ga-sw-circle ${(this.state.authy[opt.code]) ? 'ga-sw-anim' : ''}`}/>
                            </div>
                    }
                </div>
            )
        });
        return result;
    };

    updatePassword = (e) => {
        e.preventDefault();

        this.setState({
            updateStatus: "",
            updateSuccess: false
        });

        this.props.updatePassword({
            data: formSerialize(e.target, {hash: true})
        }).then(() => {
            this.setState({
                updateStatus: "Password is updated successfully.",
                updateSuccess: true
            });
        }).catch(error => {
            this.setState({
                updateStatus: error && error.message,
                updateSuccess: false
            });
        });
    };

    render() {

        const { authy } = this.state;

        return (
            <div className="ga-sec-content">
                <div className="row">
                    <div className="col-md-12 ga-sc-title">
                        <h1>Security</h1>
                    </div>
                </div>

                <div className="row ga-auth" id="ga-auth-settings">
                    <div className="col-md-12 ga-sec-auth-title">
                        <span>Two Factor Authentication</span>
                    </div>

                    <div className="col-md-12 ga-ptb40 ga-sec-auth-title-d">
                        <span>Enable Two Factor Authentication for the following actions:</span>
                    </div>

                    <div className="col-lg-5 ga-auth-rows">
                        {this.authyOptions()}
                    </div>

                    <div className="col-lg-6 offset-lg-1 ga-posr">
                        <div className={`show-mobile qrcode-area ${(authy['qrcode']) ? '' : 'ga-qr-hide'}`}>
                            {
                                authy['qrcode'] && (
                                    ((authy['login'] || authy['profile'] || authy['password'] || authy['operations']) &&
                                        <img className="qr-wrapper" width="100" height="100" src={`${api_url}account/2FA/qrcode?token=${this.props.token}`} />) ||
                                    <span className="text-danger">You need to enable 2FA with your phone before you can obtain a QR code</span>)
                            }
                        </div>
                        <div className="ga-sec-i"><img src="/assets/images/info.png" /></div>
                        Two-factor authentication adds an additional security layer to user accounts. Login and account
                        access requires both a password and a unique multi-digit code sent to a registered physical
                        device, such as a phone. Authy’s multi-device 2FA feature gives users a convenient solution to
                        securing their data.
                        <br />
                        <div className={`show-desktop qrcode-area ${(this.state.authy['qrcode']) ? '' : 'ga-qr-hide'}`}>
                            {
                                authy['qrcode'] && (
                                    ((authy['login'] || authy['profile'] || authy['password'] || authy['operations']) &&
                                        <img className="qr-wrapper" width="100" height="100" src={`${api_url}account/2FA/qrcode?token=${this.props.token}`} />) ||
                                    <span className="text-danger">You need to enable 2FA with your phone before you can obtain a QR code</span>)
                            }
                        </div>
                    </div>
                </div>

                <div className="row ga-auth">
                    <div className="col-md-12 ga-sec-auth-title"><span>Voice Login</span></div>
                    <div className="col-lg-5 ga-sec-voice">
                        <div className="ga-sec-voice-img"><img src="/assets/images/voice.png"/></div>
                        <div className="ga-sec-voice-button">
                            <button className="btn btn-round btn-disabled" onClick={() => this.enableVoiceLogin} disabled>
                                ENABLE VOICE LOGIN
                            </button>
                            <div className="ga-sec-voice-text">Voice login is disabled</div>
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 ga-posr ga-sec-voice-m">
                        <div className="ga-sec-i"><img src="/assets/images/info.png"/></div>
                        Demonstrating much lower Equal Error Rates than fingerprint, iris, or facial recognition, voice
                        biometrics offers a highly secure access mechanism for user accounts. Voice biometrics relies on
                        text-dependent passphrases, making it possible for users to simply adopt a new voiceprint phrase
                        to re-secure their account in the unlikely event of a biometric data leak.
                    </div>
                </div>

                <form name="updatePassword" method="POST" onSubmit={this.updatePassword}>
                    <div className="row ga-auth ga-change-pas">
                        <div className="col-md-12 ga-sec-auth-title ga-mb40"><span>Change Password</span></div>
                        <div className="form-group col-md-4">
                            <label htmlFor="oldPassword">Old Password</label>
                            <div className="ga-posr">
                                <input type="password" className="form-control" name="oldPassword" id="oldPassword"/>
                                <div className="ga-psh" onClick={() => this.showHidePassword('oldPassword')}/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="ga-posr">
                                <input type="password" className="form-control" name="password" id="password"/>
                                <div className="ga-psh" onClick={() => this.showHidePassword('password')}/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="rnewPassword">Repeat New Password</label>
                            <div className="ga-posr">
                                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword"/>
                                <div className="ga-psh" onClick={() => this.showHidePassword('confirmPassword')}/>
                            </div>
                        </div>

                        <div className={"col-md-12 mb-3 " + (this.state.updateSuccess ? "text-success" : "text-danger")}>
                            {this.state.updateStatus}
                        </div>

                        <div className="col-md-12">
                            <button type="submit" className="btn btn-round primary">Change Password</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ReferenceSecurity;

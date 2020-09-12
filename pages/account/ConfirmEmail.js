import React, {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';

import FancyBox from '../../components/FancyBox';

axios.defaults.baseURL = process.env.REACT_APP_API_URI;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class ConfirmEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resendState: ''
        }
    }

    onResend = (e) => {
        e.preventDefault();

        this.setState({
            resendState: 'Resending confirmation email...'
        });

        if (localStorage.lastEmail === null) {
            this.setState({
                resendState: 'Can not resend confirmation email.'
            });

            return;
        }

        axios.post('/verify/resendemail', {
            email: localStorage.lastEmail
        })
            .then(() => {
                this.setState({
                    resendState: 'Confirmation email resent!'
                });
            })
            .catch(() => {
                this.setState({
                    resendState: 'Resend error, please try again later.'
                });
            })
    };

    render() {
        return (
            <FancyBox>
                <QueueAnim type="bottom">
                    <div className="card-content no-border" key="1">
                        <section className="logo mt-5 text-center">
                            <h2 className="no-margin">Thank You!</h2>
                            <span className="page-subtitle">Parsec Frontiers</span>

                            <h5 className="mt-0 color-dark-1 text-center">
                                We have just sent you an e-mail with instructions on how to finish the registration process.
                            </h5>

                            <h5 className="mb-5 color-primary text-center">
                                Please check your mailbox and spam filter for e-mail. <br/>If not received,
                                <a href="#" onClick={this.onResend} style={{ color: "lightgreen" }}>click here to <b>RESEND</b> e-mail</a>
                            </h5>

                            <h6 className="mb-5 color-dark-1 text-center">
                                {this.state.resendState}
                            </h6>
                        </section>
                    </div>

                    <div className="card-action no-border text-center p-0" key="2">
                        <a href="#/account/login"
                           className="btn btn-round btn-white btn-border px-3 py-2 m-0 text-small">
                            Go to sign-in
                        </a>
                    </div>
                </QueueAnim>
            </FancyBox>
        );
    }
}

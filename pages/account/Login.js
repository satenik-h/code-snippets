import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import formSerialize from 'form-serialize';

import APPCONFIG from '../../constants/Config';
import {AccountActions} from '../../redux/app/actions';
import LoadingOverlay from '../../components/Common/LoadingOverlay/index';

import FancyBox from '../../components/FancyBox';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            brand: APPCONFIG.brand
        };
    }

    login = (e) => {
        e.preventDefault();
        this.props.login({
            data: formSerialize(e.target, {hash: true}),
        }).then(() => {
            // this.context.router.push('/dashboard/mainsale');
            this.context.router.push('/wallet');
        });
        this.props.loginErrorReset();
    };

    resendEmail = (e) => {
        e.preventDefault();
        const email = document.getElementById('login').value;
        const data = { email };
        this.props.resendEmail({ data });
    }

    cleanupErrors = () => {
        this.props.loginErrorReset();
    };

    render() {
        return (
            <FancyBox>
                <LoadingOverlay overlayClass={(this.props.loading) ? 'overlay show' : 'overlay'} message=""/>

                <form className="form-horizontal" method="POST" onSubmit={(e) => this.login(e)}>
                    <QueueAnim type="bottom">
                        <div className="card-content" key="1">
                            <section className="logo text-center">
                                <h4 className="mb-4 auth-title">Parsec Frontiers login</h4>
                            </section>

                            <hr/>

                            <fieldset className="mb-3">
                                <div className="form-group">
                                    <p className="text-danger mb-0">
                                        {this.props.error}
                                    </p>
                                    {
                                        this.props.error === 'Email is not confirmed.' &&
                                        <p className="text-danger mb-0">
                                            Click <a href="#" onClick={this.resendEmail}><u>here</u></a> to resend verification email.
                                        </p>
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="login">Login</label>
                                    <input type="text" className="secondary" id="login" name="login"
                                           onClick={() => this.cleanupErrors()} placeholder="Enter your Email Address" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="secondary" id="password" name="password"
                                           onClick={() => this.cleanupErrors()} placeholder="********" required />
                                </div>
                            </fieldset>
                        </div>

                        <div className="card-action p-0 mt-4 no-border text-center" key="2">
                            <button className="btn btn-round btn-full btn-signin" disabled={this.props.loading}>
                                Login
                            </button>

                            <a href="#/account/signup" className="btn btn-round btn-full btn-signup mt-4"
                               onClick={() => this.cleanupErrors()} disabled={this.props.loading}>
                                Register
                            </a>

                            <div className="redirect-link mt-4 text-center">
                                Can't log in? <a href="#/account/recover-password" onClick={() => this.cleanupErrors()}>Recover Password</a>
                            </div>
                        </div>

                        <div className="card-action no-border text-center hidden-xs-up" key="3">
                            <h4>Login via SSO</h4>

                            <div className="social-icons">
                                <a href="" className="hover-secondary"><i className="fa fa-linkedin-square fa-2x" /></a>
                                <span className="space" />
                                <a href="" className="hover-secondary"><i className="fa fa-facebook-square fa-2x" /></a>
                                <span className="space" />
                                <a href="" className="hover-secondary"><i className="fa fa-twitter fa-2x" /></a>
                            </div>
                        </div>
                    </QueueAnim>
                </form>
            </FancyBox>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        loading: state.userReducer.loginLoading || state.userReducer.fetchUserLoading,
        error: state.userReducer.loginError || state.userReducer.fetchUserError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: req => dispatch(AccountActions.login(req.data)),
        loginErrorReset: () => dispatch(AccountActions.loginErrorReset()),
        resendEmail: req => dispatch(AccountActions.resendEmail(req.data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

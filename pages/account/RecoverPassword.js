import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import formSerialize from 'form-serialize';

import APPCONFIG from '../../constants/Config';
import {AccountActions} from '../../redux/app/actions';

import FancyBox from '../../components/FancyBox';

// import LoadingOverlay from '../../components/Common/LoadingOverlay/index';

class RecoverPassword extends Component {
    constructor() {
        super();
        this.state = {
            brand: APPCONFIG.brand,
            successMsg: ''
        };
    }

    sendResetLink = (e) => {
        e.preventDefault();

        this.props.sendResetLink({
            data: formSerialize(e.target, {hash: true}),
        }).then((successMsg) => {
            this.setState({
                successMsg
            });
        });

        this.props.sendResetLinkErrorReset();
    };

    render() {
        return (
            <FancyBox>
                {/*<LoadingOverlay overlayClass={(this.props.loading && !this.props.twoFactorCB) ? 'overlay show' : 'overlay'} message=""/>*/}

                <QueueAnim type="bottom">
                    <div className="card-content" key="1">
                        <section className="logo text-center">
                            <h4 className="mb-4">
                                Enter Email Address
                            </h4>
                        </section>

                        <form className="form-horizontal ph-60" method="POST" onSubmit={(e) => this.sendResetLink(e)}>
                            <hr/>

                            <fieldset className="mb-3">
                                <div className="form-group mt-3">
                                    <span className="text-success">{this.state.successMsg}</span>
                                </div>

                                <div className="form-group mt-3">
                                    <span className="text-danger">{this.props.error}</span>
                                </div>

                                <div className="form-group d-flex mt-3">
                                    <input type="email" name="email" className="px-0 gray-border text-medium"
                                           placeholder="Email Address" autoFocus required/>
                                </div>

                                <div className="form-group mt-4 text-center">
                                    <button type="submit" className="btn btn-round primary d-flex align-items-center m-auto">
                                        <span>Send Reset Email</span>
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>

                    <div className="card-action no-border text-center p-0 mt-5" key="2">
                        <div>
                            <span className="redirect-link">
                                Don't have an account? <a href="#/account/signup" className="primary">Sign up</a>
                            </span>
                        </div>

                        <div className="mt-4">
                            <span className="redirect-link">
                                Already got account? <a href="#/account/login" className="secondary">Sign in</a>
                            </span>
                        </div>
                    </div>
                </QueueAnim>
            </FancyBox>
        );
    }
}

RecoverPassword.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        twoFactorCB: state.twoFactorReducer.twoFactorCB,
        loading: state.userReducer.sendResetLinkLoading,
        error: state.userReducer.sendResetLinkError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendResetLink: (req) => dispatch(AccountActions.sendResetLink(req.data)),
        sendResetLinkErrorReset: () => dispatch(AccountActions.sendResetLinkErrorReset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);

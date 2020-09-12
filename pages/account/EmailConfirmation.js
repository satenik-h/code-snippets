import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QueueAnim from 'rc-queue-anim';

import {AccountActions} from '../../redux/app/actions';

import FancyBox from '../../components/FancyBox';

class EmailConfirmation extends Component {
    constructor(props) {
        super(props);

        const { token } = props.params;
        this.props.verifyEmail({
            data: token
        });
    }

    showContent = () => {
        if (this.props.loading) {
            return null;
        } else {
            if (this.props.error) {
                return this.props.error;
            }

            return "Thanks, your email has been verified successfully.";
        }
    };

    render() {
        return (
            <FancyBox>
                <QueueAnim type="bottom">
                    <div className="card-content no-border">
                        <section className="logo text-center">
                            <h2 className="no-margin">Thank You!</h2>
                            <span className="page-subtitle">Parsec Frontiers</span>
                        </section>

                        <div className="p-5"/>

                        <h5 className="mt-0 p-3 text-center">
                            {this.showContent()}
                        </h5>
                    </div>

                    {(!this.props.loading) && (
                        <div className="card-action no-border text-center p-0">
                            <a href="#/account/login"
                               className="btn btn-round btn-white btn-border px-3 py-2 m-0 text-small">
                                <i className="fa fa-chevron-left"/> Go to Login
                            </a>
                        </div>
                    )}
                </QueueAnim>
            </FancyBox>
        );
    }
}

EmailConfirmation.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        loading: state.userReducer.verifyEmailLoading,
        error: state.userReducer.verifyEmailError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyEmail: (req) => dispatch(AccountActions.verifyEmail(req.data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);

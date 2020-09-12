import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Header from '../components/Header/index';
import {PurchaseActions, AccountActions} from '../redux/app/actions';

class MainApp extends Component {

    signOut = (e) => {
        e.preventDefault();
        this.props.signOut({
            data: this.props.userToken
        });
        push('/');
    };

    render() {
        const { children, location } = this.props;

        return (
            <div className="main-app-container">
                {/*<div className="container coming-soon">
                    <h5 className="coming-soon-heading">
                        Your account with Parsec Frontiers has been successfully created.<br/><br/>
                        It will give access to the investor dashboard that we will be launching soon. You will receive
                        an email once it is up and running.
                    </h5>
                    <br/>
                    <a className="coming-soon-logout" href="#" onClick={this.signOut}>Logout</a>
                </div>*/}
                <section id="page-container" className="app-page-container">
                    <Header />

                    <div className="app-content-wrapper bg-gray">
                        <div className="app-content">
                            <div className="full-height d-flex flex-column align-items-center justify-content-center">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (req) => dispatch(AccountActions.signOut(req.data))
    };
};

MainApp.propTypes = {
    userToken: PropTypes.string.isRequired,
    signOut: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);

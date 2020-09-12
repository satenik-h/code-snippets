import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AccountActions} from '../../redux/app/actions';

import ReferenceProfile from './Profile';
import ReferenceSecurity from './Security';
import ReferenceSettings from './Settings';

export class References extends Component {
    updateUserProfile = req =>
        this.props.updateUserProfile({
            ...req,
            token: this.props.userToken,
            userId: this.props.userId,
        });

    update2FA = req =>
        this.props.update2FA({
            ...req,
            token: this.props.userToken,
        });

    updatePassword = req =>
        this.props.updatePassword({
            ...req,
            token: this.props.userToken,
            userId: this.props.userId,
        });

    render() {
        return (
            <div className="references-container">
                {(this.props.params.type === 'settings')
                    ? (
                        <ReferenceSettings />
                    )
                    : (this.props.params.type === 'profile')
                        ? (
                            <ReferenceProfile
                                userData={this.props.userData}
                                updateProfile={this.updateUserProfile}
                            />
                        )
                        : (this.props.params.type === 'security')
                            ? (
                                <ReferenceSecurity
                                    token={this.props.userToken}
                                    authy={this.props.userData.authy}
                                    update2FA={this.update2FA}
                                    updatePassword={this.updatePassword}
                                />
                            )
                            : ''
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.userReducer.userData,
        userId: state.userReducer.userId,
        userToken: state.userReducer.userToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserProfile: (req) => dispatch(AccountActions.updateUserProfile(req.data, req.token, req.userId)),
        update2FA: (req) => dispatch(AccountActions.update2FA(req.data, req.token)),
        updatePassword: (req) => dispatch(AccountActions.updatePassword(req.data, req.token, req.userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(References);

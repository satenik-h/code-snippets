import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';

import {customStyles} from '../../constants/Helpers';
import {TwoFactorActions} from '../../redux/app/actions';
import TwoFactorAuthentication from '../TwoFactorAuthentication/TwoFactorAuthentication';

class TFAModal extends Component {
    twoFactorAuth = code => {
        this.props.twoFactorAuthGo({code}, this.props.twoFactorCB);
    };

    close2FA = () => {
        this.props.twoFactorAuthGo({code: "-------"}, this.props.twoFactorCB);
    };

    render() {
        return (
            <ReactModal
                isOpen={!!this.props.twoFactorCB}
                onRequestClose={this.close2FA}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="inform-modal">
                    <h5 className="primary">
                        Please enter the One Time Passcode you received to continue
                    </h5>

                    <TwoFactorAuthentication onSubmit={this.twoFactorAuth} onCancel={this.close2FA}/>
                </div>
            </ReactModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        twoFactorCB: state.twoFactorReducer.twoFactorCB,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        twoFactorAuthGo: (data, twoFactorCB) => dispatch(TwoFactorActions.twoFactorAuthGo(data.code, twoFactorCB))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TFAModal);

import React from 'react';
import ReactModal from 'react-modal';

import {customStyles} from '../../constants/Helpers';
import TwoFactorAuthentication from '../TwoFactorAuthentication/TwoFactorAuthentication';

const PreSaleTFAModal = ({isOpen, closeModal, errorText, verifyFlashsaleCode}) => (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
    >
        <div className="inform-modal">
            <h5 className="primary">
                Please enter the Flash Sale One Time Password To Continue
            </h5>

            <span className="text-danger">{errorText}</span>

            <div>
                <TwoFactorAuthentication
                    onSubmit={verifyFlashsaleCode}
                    onCancel={closeModal}
                />

                <div className="no-border text-center ph-60 mt-2">
                    <span className="redirect-link">
                        If you do not have the password it can be found inside our <a href="https://t.me/parsecfrontiers" className="secondary">Telegram Group</a>
                    </span>
                </div>
            </div>
        </div>
    </ReactModal>
);

export default PreSaleTFAModal;

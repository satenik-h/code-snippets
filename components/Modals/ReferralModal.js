import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ClipboardJS from 'clipboard';
import ReactTooltip from 'react-tooltip'

import { customStyles } from '../../constants/Helpers';

export default class ReferralModal extends Component {

    componentDidMount() {
        this.clipboard = new ClipboardJS("#copy_button");

        this.clipboard.on('success', e => {
            this.btn.setAttribute("data-tip", "Link copied");
            ReactTooltip.show(this.btn);
            setTimeout(() => {
                ReactTooltip.hide(this.btn);
                this.btn.setAttribute("data-tip", "");
            }, 1000);
            e.clearSelection();
        });
    }

    componentWillUnmount() {
        if (this.clipboard)
            this.clipboard.destroy();
    }

    render() {
        const { userId, isOpen, closeModal, goToReferralDashboard } = this.props;
        const ambassadorLink = window.location.protocol + "//" + window.location.hostname + '/?refId=' + userId;
        return (
            <ReactModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="popup-modal">
                    <h5 className="p-md-4 mx-3 my-0 secondary text-center">
                        Give the link below to your prospective clients and start earning COIN today.
                </h5>
                    <div className="input-group">
                        <input type="text" className="form-control copypaste-link" id="ambassador_link" value={ambassadorLink} readOnly />
                        <div className="input-group-button">
                            <ReactTooltip event="" eventOff=""/>
                            <button ref={btn=>this.btn=btn} id="copy_button" className="btn btn-sm" type="button" data-clipboard-target="#ambassador_link" data-tip="">
                                <i className="material-icons">content_copy</i>
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-round primary white-color" onClick={goToReferralDashboard}>
                        GO TO AMBASSADOR DASHBOARD
                </button>
                </div>
            </ReactModal>
        );
    };
}

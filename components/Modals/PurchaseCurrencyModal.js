import React from 'react';
import ReactModal from 'react-modal';

import {customStyles} from '../../constants/Helpers';

const PurchaseCurrencyModal = ({isOpen, selectedCurrencyCode, closeModal, okModal}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="popup-modal">
                <h5 className="mx-3 secondary text-center">IMPORTANT</h5>There are only a few COINs left at the
                current price. Once you input your request, we will accept
                your {selectedCurrencyCode.toUpperCase()} at a fixed EUR exchange rate for 60 minutes.
                However, should the stock of COINs at the current price be exhausted before transfer is
                received, or should the amount of COIN you requested surpass the available stock at the time, we
                won't be able to guarantee the {selectedCurrencyCode.toUpperCase()}/PSRC rate shown.

                <button className="btn btn-round primary white-color" onClick={okModal}>
                    OK, I UNDERSTAND
                </button>
            </div>
        </ReactModal>
    );
};

export default PurchaseCurrencyModal;

import React, {Component} from 'react';
import ReactModal from 'react-modal';

import {customStyles} from '../../constants/Helpers';

export default class PreSaleEndModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.opened
        };
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        });
    };

    render() {
        return (
            <ReactModal
                isOpen={this.state.isOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="inform-modal">
                    <p>
                        <img src="/assets/images/coin.png" />
                        <span className="hidden-sm-down">&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                        <img src="/assets/images/coin.png" />
                        <span className="hidden-sm-down">&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                        <img src="/assets/images/coin.png" />
                        <span className="hidden-sm-down">&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                        <img src="/assets/images/coin.png" />
                    </p>

                    <p>We are extremely excited to announce that parsecfrontiers’s pre-Token<br/> sale goals have been met, and the <strong>PSRC</strong> token pre-sale is now closed.</p>

                    <p>
                        Word on the street is that we might just be opening up small baskets of <strong>PSRC</strong>&nbsp;
                        before the main sale inside <a href="https://t.me/parsecfrontiers"> our Telegram community</a>, so&nbsp;
                        be sure to <a href="https://t.me/parsecfrontiers">hop on to Telegram</a> for a chance to snag some&nbsp;
                        before the main sale begins!
                    </p>

                    <p>
                        <img src="/assets/images/coin.png" />
                        <span className="hidden-sm-down">&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                        <img src="/assets/images/coin.png" />
                        <span className="hidden-sm-down">&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                        <button className="btn btn-round primary white-color" onClick={this.closeModal}>OK!</button>
                        <span className="hidden-sm-down">&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                        <img src="/assets/images/coin.png" />
                        <span className="hidden-sm-down">&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                        <img src="/assets/images/coin.png" />
                    </p>
                </div>
            </ReactModal>
        );
    }
}

import React from 'react';
import {getTimeString} from '../../../constants/Helpers';

const LastPurchaseDetail = ({payment}) => {
    const {
        address,
        currency,
        credited,
        debited,
        createdAt,
        amount
    } = payment;

    const qrPath = "https://chart.googleapis.com/chart?chs=125x125&cht=qr&chl=" + address;

    return (
        <div className="col-lg-8">
            <div className="ga-st-bg">
                <div className="row">
                    <div className="col ga-st-send">
                        <div>{debited ? "You sent" : "Send"}</div>
                        <div>
                            <div className="text-uppercase">{amount.gross} {currency}</div>
                            <div className={"ga-purple " + currency} />
                        </div>
                        <div>to this address</div>
                    </div>

                    <div className="col ga-st-scan">
                        <div>{debited ? "Or scan this QR code" : ""}</div>
                        <div className="qr-wrapper ml-1 p-0 text-huge">
                            <img className={"align-bottom" + (!!address ? "" : " hidden-xs-up")} src={qrPath} />
                            {debited ? <div className="fa fa-3x qr-overlay" /> : null}
                        </div>
                    </div>

                    <div className="col-md-12 ga-st-address">
                        <div className="ga-popover">
                            <div className="ga-arrow" />
                            <div className="ga-arrow-bg" />
                            <div className="ga-popover-inner">
                                <div>{debited ? <s>{address}</s> : address}</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="ga-1500-animation">
                            <img className="ga-1500-base" src="/assets/images/buildings.png" />
                            <div className="ga-1500-scale">
                                <img className="ga-1500-billboard" src="/assets/images/billboard.png" />
                                <div className="ga-1500-content">
                                    {credited ? "Credited!" : (debited ? "Received!" : "Waiting ...")}
                                </div>
                            </div>
                            <img className="ga-1500-cloud-b1" src="/assets/images/cloud-big.png" />
                            <img className="ga-1500-cloud-s1" src="/assets/images/cloud-small-r.png" />
                            <img className="ga-1500-bird-1" src="/assets/images/bird.png" />
                            <img className="ga-1500-bird-2" src="/assets/images/bird.png" />
                        </div>
                    </div>

                    <div className="col-md-6 ga-p-started">
                        <div className="row">
                            <div className="col-md-12 ga-p-start-d">
                                <div>Purchase started</div>
                                <div>{getTimeString(createdAt)}</div>
                            </div>

                            <div className="col-md-12 mb-3">
                                <div>
                                    {credited
                                        ? (
                                            <b className='text-large'>Credited!</b>
                                        )
                                        : (debited
                                            ? (
                                                <b className='text-large'>Received!</b>
                                            )
                                            : (
                                                <b className='text-medium'>Waiting for confirmations ...</b>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastPurchaseDetail;

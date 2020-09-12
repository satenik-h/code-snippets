import React, {Component} from 'react';
import 'whatwg-fetch';

export default class PurchaseDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            safeLow: 0,
            fast: 0
        };

        fetch('https://ethgasstation.info/json/ethgasAPI.json')
            .then(res => res.json())
            .then(ethGas =>
                this.setState({
                    ...ethGas
                }));
    }
    
    render() {
        const {
            address,
            currency,
            grossAmount,
            payment,
            startedAt
        } = this.props;
        const qrPath = "https://chart.googleapis.com/chart?chs=125x125&cht=qr&chl=" + address;

        return (
            <div className="ga-st-bg h-100 d-flex flex-column justify-content-between">
                <div className="row">
                    <div className="col ga-st-send">
                        <div>Send</div>
                        <div>
                            <div className="text-uppercase">
                                {grossAmount} {currency}
                            </div>
                            <div className={"ga-purple " + currency} />
                        </div>
                        <div>to this address</div>
                    </div>

                    <div className="col ga-st-scan">
                        <div>Or scan this QR code</div>
                        <div className="qr-wrapper ml-1 p-0">
                            <img className={"align-bottom" + (!!address ? "" : " hidden-xs-up")} src={qrPath} />
                        </div>
                    </div>

                    <div className="col-md-12 ga-st-address">
                        <div className="ga-popover">
                            <div className="ga-arrow" />
                            <div className="ga-arrow-bg" />
                            <div className="ga-popover-inner">
                                {!!address ? address : "Loading..."}
                            </div>

                            <div className="mt-3 text-small">
                                The Wallet Address linked to this purchase will only be active for 24 hours.
                                Transactions remitted after this window closes will not be applied to your COIN balance.
                            </div>

                            <div className="mt-3 text-small">
                                The exchange rate shown on this confirmation page will be fixed for the next 60 minutes.
                                If your transaction is not on the blockchain within this time frame the current rate at
                                the time the transaction appears will be applied to your purchase.
                            </div>

                            <div className="mt-3 text-small">
                                <b className="text-medium">Important Note:</b> Every Purchase <b>MUST</b> be made in a Single Transaction.
                                If you purchase 3 ETH you should send one transfer for 3 ETH not 3 Transfers of 1 ETH each.
                                If more than one transaction is submitted we cannot guarantee accreditation.
                                Creating multiple purchases is <b>NOT</b> an issue.
                            </div>

                            <div className={"mt-3 text-small" + (currency === 'eth' ? "" : " hidden-xs-up")}>
                                Gas Limit - 36000<br />
                                Gas Price - {(this.state.safeLow / 10).toFixed(0)} Gwei<br />
                                Always check  <a href="https://ethgasstation.info/">https://ethgasstation.info/</a> before submitting a transaction to the network.
                                Currently the minimum suggested gas is {(this.state.safeLow / 10).toFixed(0)} Gwei and the recommended gas for a fast transaction is {(this.state.fast / 10).toFixed(0)} Gwei<br />
                                Sending a transaction with less gas can result in a failed transaction or get your transaction stuck in a pending state for an extended period of time.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="ga-1500-animation">
                            <img className="ga-1500-base" src="/assets/images/buildings.png" />
                            <div className="ga-1500-scale">
                                <img className="ga-1500-billboard" src="/assets/images/billboard.png" />
                                <div className="ga-1500-content">Waiting ...</div>
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
                                <div>{startedAt}</div>
                            </div>

                            <div className="col-md-12 mb-3">
                                {(!payment || !payment.credited) && (
                                    <div>Waiting for confirmations:</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

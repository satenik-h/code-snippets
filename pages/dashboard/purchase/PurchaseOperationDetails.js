import React, {Component} from 'react';

export default class PurchaseOperationDetails extends Component {
    render() {
        const {
            currency,
            grossAmount,
            tokenPrice,
            tokens
        } = this.props;

        return (
            <div className="operation-details bg-white d-flex flex-column justify-content-between">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ga-st-od">Purchase details</div>
                    </div>

                    <div className="col-md-12">
                        <div className="ga-st-cont-buy pb-4">
                            <div className="ga-st-buy">
                                <div className="d-flex justify-content-between">
                                    <div>Coin to Buy</div>
                                    <div>{tokens} <span>PSRC</span></div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>COIN Price</div>
                                    <div>{tokenPrice} <span className="text-uppercase">{currency}</span></div>
                                </div>
                            </div>
                            <div className="ga-st-amount">
                                <div className="d-flex justify-content-between">
                                    <div>Net Amount</div>
                                    <div>{grossAmount} <span>PSRC</span></div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div>Commission (0.0%)</div>
                                    <div>0 <span className="text-uppercase">{currency}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="ga-st-ga d-flex justify-content-between">
                            <div>Gross Amount</div>
                            <div>{grossAmount} <span className="text-uppercase">{currency}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

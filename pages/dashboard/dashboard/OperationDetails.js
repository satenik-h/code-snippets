import React, {Component} from 'react';
import { teal100 } from 'material-ui/styles/colors';
import { makeCryptoString } from '../../../constants/Helpers';

export default class OperationDetails extends Component {
    render() {
        const {
            currency,
            amount,
            coinPrice
        } = this.props.payment;

        const tokens = Math.round(amount.net / coinPrice);

        return (
            <div className="col-lg-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ga-st-od">Purchase details</div>
                    </div>

                    <div className="col-md-12">
                        <div className="ga-st-cont-buy">
                            <div className="ga-st-buy">
                                <div className="d-flex justify-content-between">
                                    <div>Coin to Buy</div>
                                    <div>{tokens} <span>PSRC</span></div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div>COIN Price</div>
                                    <div>{makeCryptoString(coinPrice, currency)} <span className="text-uppercase">{currency}</span></div>
                                </div>
                            </div>

                            <div className="ga-st-amount">
                                <div className="d-flex justify-content-between">
                                    <div>Net Amount</div>
                                    <div>{amount.net} <span className="text-uppercase">{currency}</span></div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div>Commission (0.0%)</div>
                                    <div>{amount.fee} <span className="text-uppercase">{currency}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="ga-st-ga d-flex justify-content-between">
                            <div>Gross Amount</div>
                            <div>{amount.gross} <span className="text-uppercase">{currency}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

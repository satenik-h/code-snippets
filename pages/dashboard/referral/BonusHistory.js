import React, {Component} from 'react';

import {getTimeString} from '../../../constants/Helpers';

export default class BonusHistory extends Component {
    renderPaymentTable = () => {
        let result = [];

        const rW = this.props.referralWallet;

        if (rW && rW.balanceHistory.constructor === Array) {
            const bH = rW.balanceHistory;
            for (let i = 1; i < bH.length; i++) {
                const dateString = getTimeString(bH[i].timestamp);
                const tokens = bH[i].newBalance - bH[i-1].newBalance;
                const referral = bH[i].referral;

                result.push(
                    <tr key={i-1}>
                        <td scope="row" className="color-dark-2"><a>{dateString}</a></td>
                        <td><strong className>{tokens}</strong> (PSRC)</td>
                        <td><strong>{referral}</strong></td>
                    </tr>
                );
            }
        }

        return result;
    };

    render() {
        return (
            <div className="ga-purchase-h" id="gaPurchaseH">
                <div className="row ga-ph-title">
                    <div className="col-md-6 col-sm-12"><strong>Bonus History</strong></div>

                    <div className="col-md-6 col-sm-12 hidden-xs-up">
                        <div id="ga-switcher-c" className="ga-switcher" data-state="1">
                            <div data-c="1" className="ga-sw-pt">psrc</div>
                            <div data-c="2">eur</div>
                            <div id="ga-sw" />
                        </div>
                        <span className="ga-purple-text"><a href="#">Change base currency</a></span>
                    </div>
                </div>

                <div className="row ga-pt50">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>COIN Amount</th>
                                <th>Referral</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderPaymentTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

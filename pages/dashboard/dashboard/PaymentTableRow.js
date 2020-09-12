import React, {Component} from 'react';

import {getTimeString} from '../../../constants/Helpers';

export default class PaymentTableRow extends Component {
    getTokenPrice = (payment) => {
        let subunitExponent = 6;
        if (payment.currency === 'btc' || payment.currency === 'bch') {
            subunitExponent = 8;
        }
        return Math.round(payment.coinPrice * Math.pow(10, subunitExponent)) / Math.pow(10, subunitExponent);
    };

    render() {
        const {
            payment,
            paymentDetail,
            showModal
        } = this.props;

        const dateString = getTimeString(payment.createdAt);
        const grossAmount = payment.amount.gross;
        const netAmount = payment.amount.net;
        const fee = payment.amount.fee;
        const currency = payment.currency.toUpperCase();
        const tokenPrice = this.getTokenPrice(payment);
        const tokens = Math.round(payment.amount.net / tokenPrice);
        let bonus = 0;

        let status = "", time = "";
        if (payment.credited) {
            status = "Credited!";
            if (payment.referral_bonus || payment.presale_bonus)
                bonus = Math.round(tokens * 0.025);
            if (payment.isApp_bonus)
                bonus += 50;
        } else if (payment.debited) {
            status = "Received!";
        } else {
            status = "Pending";

            const currentTime = new Date().getTime();
            const diffTime = currentTime - (new Date(payment.createdAt)).getTime();
            const diffX = 24 * 3600 * 1000 - diffTime;
            if (diffX > 0) {
                const diffHours = Math.floor(diffX / (1000 * 3600));
                const diffMinutes = Math.floor((diffX - diffHours * 1000 * 3600) / (1000 * 60));

                time = "Expires in " + diffHours + "h " + diffMinutes + "m";

                const diffY = 3600 * 1000 - diffTime;
                if (diffY > 0) {
                    const diffMins = Math.floor(diffY / (1000 * 60));
                    time += "(" + diffMins + "m left for fixed rate)";
                } else {
                    time += "(Real-Time Exchange Rate)";
                }
            } else {
                status = "Expired";
            }
        }

        return (
            <tr>
                <td scope="row" className="color-dark-2">
                    <a href="#/dashboard/" onClick={(e) => paymentDetail(payment, e)}>{dateString}</a>
                </td>

                <td>
                    <strong>{tokens}</strong> (PSRC) <strong> {bonus ? ` +${bonus} bonus` : ''}</strong>
                    <div className="text-small">{tokenPrice} ({currency}/PSRC)</div>
                </td>

                <td>
                    <div className={payment.currency}/>
                    <strong>{netAmount}</strong><span> ({currency}) / {fee} ({currency})</span>
                </td>

                <td><strong>{grossAmount}</strong><span> ({currency})</span></td>

                <td><strong>{status}</strong><div className="text-small">{time}</div></td>

                <td>
                    {(status === "Pending" || status === "Expired") && (
                        <button className="btn btn-transparent p-1" onClick={() => showModal(payment._id)}>
                            <i className="material-icons color-dark">delete</i>
                        </button>
                    )}
                </td>
            </tr>
        );
    }
}

import React, {Component} from 'react';

import PaymentTableRow from './PaymentTableRow';

export default class PaymentTable extends Component {
    renderPaymentTable = () => {
        let result = [];

        const paymentDetail = this.props.paymentDetail;
        const showModal = this.props.showModal;

        if (this.props.payments && this.props.payments.constructor === Array) {
            this.props.payments.forEach((payment, index) => {
                result.push(
                    <PaymentTableRow
                        key={index}
                        payment={payment}
                        paymentDetail={paymentDetail}
                        showModal={showModal}
                    />
                );
            });
        }

        return result;
    };

    render() {
        return (
            <div className="ga-purchase-h" id="gaPurchaseH">
                <div className="row ga-ph-title">
                    <div className="col-md-6 col-sm-12"><strong>Purchase History</strong></div>

                    <div className="col-md-6 col-sm-12 hidden-xs-up">
                        <div id="ga-switcher-c" className="ga-switcher" data-state="1">
                            <div data-c="1" className="ga-sw-pt">psrc</div>
                            <div data-c="2">eur</div>
                            <div id="ga-sw"/>
                        </div>
                        <span className="ga-purple-text"><a href="#">Change base currency</a></span>
                    </div>
                </div>

                <div className="row ga-pt50">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>COIN Amount / Price</th>
                                <th>NET Amount / Commission</th>
                                <th>Gross Amount</th>
                                <th>Status</th>
                                <th>Remove</th>
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

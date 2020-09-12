import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';

import {PurchaseActions} from '../../../redux/app/actions';
import LastPurchaseDetail from './LastPurchaseDetail';
import OperationDetails from './OperationDetails';
import PaymentTable from './PaymentTable';
import BigBoard from '../../../components/Common/BigBoard';
import LoadingOverlay from '../../../components/Common/LoadingOverlay';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: "",
            loading2: "",
            grossAmount: 0,
            address: '',
            startedAt: '',
            tokenPrice: 0,
            tokens: 0,
            showRemoveModal: false,
            removePaymentId: 0,
            payments: [],

            pageCount: 1,
            pageNumber: 0,
            perPage: 5,
            currentPayments: []
        };
    }

    componentWillMount() {
        // this.getPayments();
        if (!this.props.sales || !this.props.sales.token) {
            this.props.getTokenSales({
                token: this.props.userToken,
            }).then(() => {
                this.forceUpdate();
            });
        }
    }

    getPayments = () => {
        this.props.getPayments({
            userId: this.props.userId,
            token: this.props.userToken
        }).then(() => {
            const {payments} = this.props;

            if (payments && payments.length) {
                const {perPage, pageNumber} = this.state;
                this.setState({
                    payment: payments[0],
                    pageCount: Math.ceil(payments.length / perPage),
                    currentPayments: payments.slice(pageNumber * perPage, (pageNumber + 1) * perPage)
                });
            }
        });
    };

    showModal = (paymentId) => {
        this.setState({
            showRemoveModal: true,
            removePaymentId: paymentId
        });
    };

    dismissModal = () => {
        this.setState({
            showRemoveModal: false,
            removePaymentId: 0
        });
    };

    paymentDetail = (payment, e) => {
        e.preventDefault();

        this.setState({
            payment
        });
    };

    removePayment = () => {
        if (this.state.removePaymentId) {
            this.props.removePayment({
                token: this.props.userToken,
                paymentId: this.state.removePaymentId
            }).then(() => {
                this.getPayments();
            });
        }
        this.dismissModal();
    };

    handlePageChange = (data) => {
        const {perPage} = this.state;
        const {selected} = data;

        this.setState({
            pageNumber: selected,
            currentPayments: this.props.payments.slice(selected * perPage, (selected + 1) * perPage)
        });
    };

    render() {
        let wallet = null;
        if (this.props.wallets && this.props.wallets.length > 0) {
            this.props.wallets.forEach((wt) => {
                if (wt.label.toLowerCase() === 'PSRC') {
                    wallet = wt;
                    return true;
                }
            }, this);
        }

        const {payment} = this.state;

        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <LoadingOverlay overlayClass={!this.props.payments ? "overlay show" : "overlay"} message=""/>

                <QueueAnim type="bottom" className="ui-animate">
                    <div key="1"><h4 className="mt-0">GO! Dashboard</h4></div>

                    <BigBoard
                        location={this.props.location}
                        sales={this.props.sales}
                        wallet={wallet}
                        currencyQuotes={this.props.currencyQuotes}
                    />

                    {payment && (
                        <div>
                            <div className="ga-do-section-third">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div><h4 className="mt-0">Last Purchase</h4></div>
                                    </div>

                                    <LastPurchaseDetail payment={payment}/>

                                    <OperationDetails payment={payment}/>
                                </div>
                            </div>

                            <PaymentTable
                                payments={this.state.currentPayments}
                                wallets={this.props.wallets}
                                paymentDetail={this.paymentDetail}
                                showModal={this.showModal}
                            />

                            <ReactPaginate
                                previousLabel={""}
                                previousClassName={"fa fa-arrow-left"}
                                nextLabel={""}
                                nextClassName={"fa fa-arrow-right"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={this.handlePageChange}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                            />
                        </div>
                    )}
                </QueueAnim>

                <div className={"delete-modal" + (this.state.showRemoveModal ? "" : " hidden-xs-up")}>
                    <div className="card bg-color-white">
                        <div className="card-content">
                            <span className="card-title">Warning</span>
                            <p>Are you sure you want to delete this payment?</p>
                        </div>

                        <div className="card-action text-right">
                            <button className="btn btn-transparent py-1" onClick={() => this.dismissModal()}>No</button>
                            <button className="btn btn-transparent py-1 color-primary" onClick={() => this.removePayment()}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        payments: state.purchaseReducer.payments,
        wallets: state.purchaseReducer.wallets,
        sales: state.purchaseReducer.sales,
        currencyQuotes: state.purchaseReducer.currencyQuotes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPayments: (req) => dispatch(PurchaseActions.getPayments(req.userId, req.token)),
        getTokenSales: (req) => dispatch(PurchaseActions.getTokenSales(req.token)),
        removePayment: (req) => dispatch(PurchaseActions.removePayment(req.paymentId, req.token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

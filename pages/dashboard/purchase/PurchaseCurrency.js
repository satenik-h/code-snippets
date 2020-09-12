import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';

import {PurchaseActions} from '../../../redux/app/actions';
import PurchaseCurrencyBox from './PurchaseCurrencyBox';
import PurchaseCurrencyModal from '../../../components/Modals/PurchaseCurrencyModal';

class PurchaseCurrency extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showError: false,
            modalIsOpen: false,
            selectedCurrencyCode: ""
        };
    };

    componentWillMount() {
        const {restrictions, supportedCurrencies} = this.props;
        if ((restrictions !== "no") || !supportedCurrencies || supportedCurrencies.length === 0) {
            this.context.router.push('/purchase/intro');
        }
    }

    goNext = () => {
        if (this.props.selectedCurrency !== undefined) {
            this.setState({
                showError: false
            });

            if (this.props.sales.token.stock < 500000)
                this.setState({
                    modalIsOpen: true,
                    selectedCurrencyCode: this.props.supportedCurrencies[this.props.selectedCurrency].code
                });
            else
                this.context.router.push('/purchase/amount/' + this.props.supportedCurrencies[this.props.selectedCurrency].code);
        } else {
            this.setState({
                showError: true
            });
        }
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    };

    okModal = () => {
        this.setState({
            modalIsOpen: false
        });
        this.context.router.push('/purchase/amount/' + this.props.supportedCurrencies[this.props.selectedCurrency].code);
    };

    render() {
        let disabled = this.props.selectedCurrency === -1;

        return (
            <div className="container-fluid no-breadcrumbs">
                <QueueAnim type="bottom" className="ui-animate">
                    <div className="mb-4 d-md-flex align-items-center" key="1">
                        <a href="#/purchase/intro"
                           className="btn btn-round btn-transparent btn-border px-3 py-2 text-small color-primary"
                        >
                            <i className="fa fa-chevron-left"/> Go Back
                        </a>

                        <div className="ml-md-3 mt-3 mt-md-0">
                            <h4 className="mt-0 mb-1">Which currency will you use to buy COIN ?</h4>
                            <h6 className="m-0 font-weight-light primary">COIN (PSRC) Purchase</h6>
                        </div>
                    </div>

                    <PurchaseCurrencyBox
                        currencyQuotes={this.props.currencyQuotes}
                        selectCurrency={this.props.selectCurrency}
                        selectedCurrency={this.props.selectedCurrency}
                        supportedCurrencies={this.props.supportedCurrencies}
                    />

                    <div className="row mt-5" key="4">
                        <div className="col-md-4 offset-md-4 mt-3">
                            <div className={"form-group text-center" + (this.state.showError ? "" : " hidden-xs-up")}>
                                <span className="text-danger">Please select currency type</span>
                            </div>

                            <button className="btn btn-full btn-round primary" onClick={() => this.goNext()}
                                    disabled={disabled}>
                                Continue
                            </button>
                        </div>
                    </div>
                </QueueAnim>

                <PurchaseCurrencyModal
                    isOpen={this.state.modalIsOpen}
                    selectedCurrencyCode={this.state.selectedCurrencyCode}
                    closeModal={this.closeModal}
                    okModal={this.okModal}
                />
            </div>
        )
    }
}

PurchaseCurrency.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        token: state.userReducer.userToken,
        restrictions: state.userReducer.userData.restrictions,
        sales: state.purchaseReducer.sales,
        supportedCurrencies: state.purchaseReducer.supportedCurrencies,
        selectedCurrency: state.purchaseReducer.selectedCurrency,
        currencyQuotes: state.purchaseReducer.currencyQuotes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectCurrency: (id) => dispatch(PurchaseActions.selectCurrency(id)),
        getCurrencyQuote: (req) => dispatch(PurchaseActions.getCurrencyQuote(req.currency, req.token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCurrency);

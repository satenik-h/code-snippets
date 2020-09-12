import React, {Component} from 'react';

import {normalizeCryptoAmount} from '../../../constants/Helpers';

export default class PurchaseCurrencyBox extends Component {
    selectCurrencyBox = (selectedCurrency) => {
        this.props.selectCurrency(selectedCurrency);
    };

    getCurrencyBox = () => {
        let result = [];
        const {
            currencyQuotes,
            selectedCurrency,
            supportedCurrencies
        } = this.props;
        const selectCurrencyBox = this.selectCurrencyBox;

        if (supportedCurrencies && supportedCurrencies.length > 0) {
            supportedCurrencies.forEach(function (aCurrency, i) {

                const tokenPrice = normalizeCryptoAmount(currencyQuotes['psrc' + aCurrency.code], aCurrency.code);
                const img = aCurrency.code === "bch" ? "btc" : aCurrency.code;
                const image_path = "assets/images/" + img + "_gold" + (selectedCurrency === i ? "_selected" : "") + ".png";

                result.push(
                    <div className="position-relative col-md-6 col-xl-3 mt-3" key={i}>
                        <div className={"h-100 box box-default currency-box p-5 text-center" + (selectedCurrency === i ? " active" : "")}
                             id={aCurrency.code} onClick={() => selectCurrencyBox(i)}>
                            <div className="mb-3">
                                <img className="py-4" src={image_path} />
                                <h5 className="m-0 font-weight-medium text-capitalize">
                                    {aCurrency.caption} <span className="color-dark-3 text-uppercase">({aCurrency.code})</span>
                                </h5>
                            </div>

                            <hr/>

                            <div className="mt-2">
                                <h6 className="mt-0 font-weight-medium"><b className="text-uppercase">1 {aCurrency.code}</b> gets you</h6>
                                <h5 className="m-0 primary text-uppercase">{(1/tokenPrice).toFixed(0)} PSRC</h5>
                            </div>

                            <div className="input-section hidden-xs-up">
                                <hr/>

                                <div className="mt-2">
                                    <h6 className="text-white">How much PSRC you want to buy</h6>

                                    <input className="w-100 p-2 border-0 border-radius-1 primary"
                                           type="number" min="1" id={aCurrency.caption + "-count"}
                                           placeholder="Minimum 1" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }

        return result;
    };

    render() {
        return (
            <div className="row my-3 my-md-5" key="2">
                <div className="col-md-10 offset-md-1">
                    <div className="row d-flex">
                        {this.getCurrencyBox()}
                    </div>
                </div>
            </div>
        );
    }
}

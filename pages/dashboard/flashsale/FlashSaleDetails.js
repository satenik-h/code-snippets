import React from 'react';

const FlashSaleDetails = ({ sales, flashsaleTokenOK, modalOn }) => (
    <div className="row" key="3">
        <div className="col-xl-10 offset-xl-1">
            <div className="d-flex flex-column align-items-center">
                <img src="/assets/images/coin.png" />

                <h4 className="mt-4 mb-1 color-dark">
                    {(sales && sales.token)
                        ? (
                            sales.token.stock
                                ? `${sales.token.stock.toLocaleString(navigator.language)} COIN`
                                : 'SOLD OUT'
                        )
                        : '... COIN'
                    }
                </h4>

                <h5 className="m-0 font-weight-light color-dark text-center">
                    {(sales && sales.token && sales.token.stock)
                        ? (`still available at ${sales.token.price / 100}€`) : ''}
                </h5>

                {flashsaleTokenOK === null ?
                    (
                        <button className="btn btn-round btn-disabled px-4 py-3 mt-4 font-weight-medium" disabled>
                            The sales will open at 21.00 GMT today ! Follow us on <a href="https://parsecfrontiers.com" className="text-white font-weight-bold text-underline">
                                parsecfrontiers.com</a> and on our <a href="https://t.me/parsecfrontiers" className="text-white font-weight-bold text-underline">
                                Telegram group</a> !
                                </button>
                    )
                    : (flashsaleTokenOK ? (
                        <a href="#/purchase/intro" className="btn btn-round secondary-3 px-4 py-3 mt-4">
                            <img src="/assets/images/coin-icon.png" /> Buy Coins
                                    </a>
                    )
                        : (
                            <button className="btn btn-round secondary-3 px-4 py-3 mt-4" onClick={modalOn}>
                                Flash sale !
                                    </button>
                        )
                    )
                }
            </div>
        </div>
    </div>
);

export default FlashSaleDetails;

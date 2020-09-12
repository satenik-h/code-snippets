import React from 'react';

const PreSaleDetails = ({sales, flashsaleOK, modalOn}) => (
    <div className="row" key="3">
        <div className="col-xl-10 offset-xl-1">
            <div className="d-flex flex-column align-items-center">
                <img src="/assets/images/coin.png"/>

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
                            {(sales.token && sales.token.stock)
                                ? (`@ ${sales.token.price / 100} EUR price tier still available`)
                                : null /*(
                                    <div>
                                        We are extremely excited to announce that parsecfrontiers's pre-Token sale
                                        goals<br/> have been met, and the <strong>PSRC</strong> token pre-sale is now
                                        closed.<br/><br/> Word on the street is that we might just be opening up the
                                        doors for a series of time-limited flash sales of <strong>PSRC</strong> before
                                        the main sale inside <a href="https://t.me/parsecfrontiers">our Telegram community</a>,
                                        so be sure to <a href="https://t.me/parsecfrontiers">hop on to Telegram</a> for a
                                        chance to snag some before the main sale begins!
                                    </div>
                                )*/
                            }
                        </h5>

                {(flashsaleOK === undefined)
                    ? (
                        <button className="btn btn-round btn-disabled px-4 py-3 mt-4" disabled>
                            Dear Passengers, thanks to your support we've arrived at our destination ahead of
                            schedule.
                            Our Next Scheduled Departure is on Feb 21st, the Destination: The parsecfrontiers Main
                            Token Sale
                        </button>
                    )
                    : (flashsaleOK
                        ? (
                            <a href="#/purchase/intro" className="btn btn-round secondary-3 px-4 py-3 mt-4">
                                <img src="/assets/images/coin-icon.png"/> Buy Coins
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

export default PreSaleDetails;

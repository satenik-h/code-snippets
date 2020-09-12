import React from 'react';

const Step = ({ sales, stepNumber, saleOK }) => {
    const prices = [3, 5, 7, 9, 11, 12, 13, 14, 15];
    const totals = [12.5, 25, 37.5, 50, 100, 150, 200, 250, 300];
    const TBPR = [1.25, 2.5, 3.75, 5, 8, 11, 14, 17, 20];
    stepNumber--;
    if (sales && sales.token) {
        if (sales.token.price > prices[stepNumber]) {
            return (
                <div className="d-flex p-1 border-radius-2 timeline-step">
                    <div className="flex-1 p-3 border-radius-1">
                        <h6 className="m-0 sm-text-small">Previous Price</h6>
                        <h6 className="m-0 sm-text-small">€{prices[stepNumber] / 100}</h6>
                    </div>
                    <div className="flex-2 p-3 border-radius-1">
                        <h6 className="m-0 font-weight-light sm-text-small">Milestone</h6>
                        <h6 className="m-0 sm-text-small">&gt; {totals[stepNumber]} Million</h6>
                    </div>
                    <div className="flex-2 p-3 border-radius-1">
                        <h6 className="m-0 font-weight-light sm-text-small">Token Buyback Program Reserve</h6>
                        <h6 className="m-0 sm-text-small">{TBPR[stepNumber]}%</h6>
                    </div>
                    <div className="flex-4 p-3 border-radius-1">
                        <h6 className="m-0 font-weight-light sm-text-small">Ended at</h6>
                        <h6 className="m-0 sm-text-small">
                            {new Date(sales.ended[`price${prices[stepNumber]}`]).toLocaleDateString()}
                        </h6>
                    </div>
                </div>
            );
        } else if (sales.token.price === prices[stepNumber]) {
            return (
                <div className="d-flex p-1 border-radius-2 timeline-step active">
                    <div className="flex-1 p-3 bg-gray-4 border-radius-1">
                        <h6 className="m-0 color-green-4 sm-text-small">Current Price</h6>
                        <h6 className="m-0 secondary sm-text-small">€{prices[stepNumber] / 100}</h6>
                    </div>
                    <div className="flex-2 p-3 border-radius-1">
                        <h6 className="m-0 font-weight-light sm-text-small">Milestone</h6>
                        <h6 className="m-0 sm-text-small">
                            &lt; {totals[stepNumber]} Million<span className="color-dark-3">PSRC Sold</span>
                        </h6>
                    </div>
                    <div className="flex-2 p-3 border-radius-1">
                        <h6 className="m-0 font-weight-light sm-text-small">Token Buyback Program Reserve</h6>
                        <h6 className="m-0 sm-text-small">{TBPR[stepNumber]}%</h6>
                    </div>
                    <div className="flex-4 p-3 border-radius-1">
                        <div className="d-sm-flex align-items-center text-center text-sm-left">
                            <img src="/assets/images/coin.png" />

                            <div className="ml-2">
                                <h5 className="m-0 color-dark sm-text-small">
                                    {sales.token ? sales.token.stock.toLocaleString(navigator.language) : '...'}
                                </h5>
                                <h6 className="m-0 font-weight-light color-dark sm-text-small">COIN available</h6>
                            </div>

                            {saleOK ?
                                <a href="#/purchase/intro"
                                    className="btn btn-round secondary-3 px-4 py-3 ml-2 hidden-sm-down">
                                    <img src="/assets/images/coin-icon.png" /> Buy Coins
                                </a> : null}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="d-flex p-1 border-radius-2 timeline-step">
                    <div className="flex-1 p-3 border-radius-1">
                        <h6 className="m-0 font-weight-light sm-text-small">Next Price</h6>
                        <h6 className="m-0 sm-text-small">€{prices[stepNumber] / 100}</h6>
                    </div>
                    <div className="flex-2 p-3 border-radius-1">
                        <h6 className="m-0 font-weight-light sm-text-small">Milestone</h6>
                        <h6 className="m-0 sm-text-small">&lt; {totals[stepNumber]} Million</h6>
                    </div>
                    <div className="flex-2 p-3 border-radius-1">
                        <h6 className="m-0 font-weight-light sm-text-small">Token Buyback Program Reserve</h6>
                        <h6 className="m-0 sm-text-small">{TBPR[stepNumber]}%</h6>
                    </div>
                    <div className="flex-4 p-3 border-radius-1" />
                </div>
            );
        }
    } else {
        return null;
    }
};

const ICOStep = ({ sales, saleOK }) => {
    let result = [];
    for (let i = 1; i < 10; i++) {
        result.push(
            <Step key={"step" + i} stepNumber={i} sales={sales} saleOK={saleOK} />
        );
    }

    return (
        <div className="py-5 color-dark-3 timeline-table">
            <div className="row">
                <div className="col-xl-10 offset-xl-1">
                    {result}
                </div>
            </div>
        </div>
    );
};

export default ICOStep;

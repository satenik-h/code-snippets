import React from 'react';

const BalanceButton = ({ router, goToDashboard, balance, eurBalance, usdBalance }) => (
    <div className="my-2 my-md-0 mr-0 mr-md-3 d-flex align-items-center justify-content-center">
        {/*<b className="mr-1">PSRC</b>*/}
        <img className="mr-2 hidden-sm-down" src="/assets/images/coin-icon.png" />
        <div
            className="position-relative btn btn-white btn-round btn-dashboard p-0 cursor-pointer overflow-hidden"
            onClick={() => router.push('/dashboard')}
        >
            <div className="px-3 py-2 anim-horizontal-4">
                DASHBOARD
            </div>

            <div className="px-3 py-2 anim-text-value-2 anim-horizontal-4">
                <b>{balance}</b> PSRC
            </div>

            <div className="px-3 py-2 anim-text-value-3 text-small anim-horizontal-4">
                ≈ {eurBalance} €
            </div>

            <div className="px-3 py-2 anim-text-value-4 text-small anim-horizontal-4">
                ≈ {usdBalance} $
            </div>
        </div>
    </div>
);

export default BalanceButton;

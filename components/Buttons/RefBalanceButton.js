import React from 'react';

const RefBalanceButton = ({existRefBalance, goToReferral, ref_balance, ref_eurBalance, ref_usdBalance, becomeReferral}) => (
    existRefBalance
        ? (
            <div className="my-2 my-md-0 d-flex align-items-center justify-content-center">
                <img className="mr-2 hidden-sm-down" src="/assets/images/coin-icon-gold.png"/>
                <div
                    className="position-relative btn btn-round secondary-4 p-0 m-0 cursor-pointer overflow-hidden"
                    onClick={goToReferral}
                >
                    <div className="px-3 py-2 anim-horizontal-4">
                        AMBASSADOR<br/>DASHBOARD
                    </div>

                    <div className="anim-text-value-2 anim-horizontal-4">
                        <div className="pt-3"><b>{ref_balance}</b> PSRC</div>
                    </div>

                    <div className="anim-text-value-3 text-small anim-horizontal-4">
                        <div className="pt-3">≈ {ref_eurBalance} €</div>
                    </div>

                    <div className="anim-text-value-4 text-small anim-horizontal-4">
                        <div className="pt-3">≈ {ref_usdBalance} $</div>
                    </div>
                </div>
            </div>
        )
        : (
            <div className="text-center">
                <p className="btn btn-round secondary-4 px-3 py-2 m-0" onClick={becomeReferral}>
                    EARN COIN
                </p>
            </div>
        )
);

export default RefBalanceButton;

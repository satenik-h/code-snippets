import React from 'react';

const BuyCoinButton = ({ flashsaleTokenOK, router }) => (
    <div className="mr-3 d-flex align-items-center">
        <a className="position-relative align-items-center btn btn-round secondary-3 p-0 m-0 cursor-pointer overflow-hidden">
            <div className={"px-3 py-2" + (flashsaleTokenOK ? " anim-horizontal-2" : "")} onClick={() => router.push('/dashboard/mainsale')}>
                <img src="/assets/images/coin-icon.png" /> TIMELINE
            </div>

            {flashsaleTokenOK && (
                <div className="px-3 py-2 anim-text-value-2 anim-horizontal-2" onClick={() => router.push('/purchase/intro')}>
                    <img src="/assets/images/coin-icon.png" /> BUY COIN
                </div>
            )}
        </a>
    </div>
);

export default BuyCoinButton;

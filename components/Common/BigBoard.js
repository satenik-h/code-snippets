import React from 'react';

const BigBoard = ({location, sales, wallet, currencyQuotes}) => {
    let balance = 0;
    let eurBalance = 0;
    let usdBalance = 0;

    if (wallet) {
        balance = wallet.balance;
        if (sales && sales.token) {
            eurBalance = balance * sales.token.price / 100;
            if (currencyQuotes) {
                usdBalance = eurBalance * currencyQuotes.btcusd / currencyQuotes.btceur;
            }
        }
    }

    let links = location.pathname.split("/");
    let currentPage = links[links.length - 1];

    return (
        <div className="row" key="2">
            <div className="col-md-12">
                <div className="ga-big-board-animation">
                    <img className="ga-cloud-bb-b1" src="/assets/images/cloud-big-r.png"/>
                    <img className="ga-cloud-bb-m1" src="/assets/images/cloud-m.png"/>
                    <img className="ga-cloud-bb-s1" src="/assets/images/cloud-small-l.png"/>
                    <img className="ga-bird-bb-1" src="/assets/images/bird.png"/>
                    <img className="ga-bird-bb-2" src="/assets/images/bird.png"/>
                    <img className="ga-board-bb" src="/assets/images/bb-board.png"/>
                    <img className="ga-bg-bb" src="/assets/images/bb-bg.png"/>
                    <img className="ga-tree-bb" src="/assets/images/tree.png"/>
                    <img className="ga-windmil-base-bb" src="/assets/images/plant-windmill-base.png"/>
                    <img className="ga-windmil-blades-bb" src="/assets/images/plant-blade.png"/>
                    <div className="ga-train-mask-bb">
                        <img className="ga-city-train" src="/assets/images/train.png"/>
                    </div>

                    {(currentPage === 'dashboard')
                        ? (
                            <div className="ga-inform-bb">
                                <div className="ga-do-bb-text">
                                    parsecfrontiers adheres to standard KYC and AML protocols, thus your COIN purchases
                                    will remain in locked status until you have completed your profile.
                                    Once your account has been fully verified the COIN inside your wallet will
                                    be unlocked and upon distribution will be fully available to sell or transfer
                                    to a compatible external wallet.
                                </div>
                                <div className="ga-do-bb-text pt-1">
                                    <b>Important Note:</b> Every Purchase MUST be made in a Single Transaction.
                                    If you purchase 3 ETH you should send one transfer for 3 ETH not 3 Transfers of
                                    1 ETH each.
                                    If more than one transaction is submitted we cannot guarantee accreditation.
                                    Creating multiple purchases is NOT an issue.
                                </div>
                            </div>
                        )
                        : (
                            <div className="ga-inform-bb">
                                <div className="ga-do-bb-text">
                                    There are several benefits of becoming a parsecfrontiers Brand Ambassador. First, you
                                    will receive 5% of all COIN (PSRC) your referees have purchased. For example, if
                                    your referee purchases 1,000,000 PSRC, you will receive 50,000 PSRC to your
                                    parsecfrontiers COIN wallet.
                                </div>
                                <div className="ga-do-bb-text">
                                    To participate in the parsecfrontiers Ambassador Program all you need to do is share
                                    your Ambassador link with your prospective clients.
                                </div>
                            </div>
                        )
                    }

                    <div className="ga-do-pb rounded">
                        <div className="ga-do-pb-title d-flex align-items-center">
                            <img src="/assets/images/coin-icon-gold.png"/>
                            <div className="ml-2">Balance</div>
                        </div>
                        <div className="ga-do-pb-number">
                            <span>{balance}</span> PSRC
                            <p className="mt-3 text-medium"><span>{eurBalance.toFixed(2)}€</span> Equivalent</p>
                            <p className="mt-0 text-medium"><span>${usdBalance.toFixed(2)}</span> Equivalent</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigBoard;

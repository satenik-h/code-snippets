import React from 'react';

const WalletButton = ({ router, goToWallet }) => (
    <div className="nav-button d-flex align-items-center justify-content-center">
        <div
            onClick={() => router.push('/wallet')}
        >
            <span>Wallet</span>
        </div>        
    </div>
);

export default WalletButton;

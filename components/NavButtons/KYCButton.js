import React from 'react';

const KYCButton = ({ router, goToKYC }) => (
    <div className="nav-button d-flex align-items-center justify-content-center">
        <div
            onClick={() => router.push('/kyc')}
        >
            <span>KYC</span>
        </div>        
    </div>
);

export default KYCButton;

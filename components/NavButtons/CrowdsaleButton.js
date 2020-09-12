import React from 'react';

const CrowdsaleButton = ({ router, goToCrowdsale }) => (
    <div className="nav-button d-flex align-items-center justify-content-center">
        <div
            onClick={() => router.push('/crowdsale')}
        >
            <span>Crowdsale</span>
        </div>        
    </div>
);

export default CrowdsaleButton;

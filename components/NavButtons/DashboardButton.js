import React from 'react';

const DashboardButton = ({ router, goToDashboard }) => (
    <div className="nav-button d-flex align-items-center justify-content-center">
        <div
            onClick={() => router.push('/dashboard')}
        >
            <span>DASHBOARD</span>
        </div>        
    </div>
);

export default DashboardButton;

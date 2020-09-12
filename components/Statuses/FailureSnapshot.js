import React from 'react';

const FailureSnapshot = ({type}) => (
    <div className="row">
        <div className="col-md-12 align-self-center justify-content-center text-center">
            <div className="ga-pending-container">
                <img src="assets/images/logo.png"/>
                <img className="ga-pending ga-anim-rotate" src="assets/images/pending.png"/>
            </div>

            <h3>Your Snapshot can't be handled</h3>
            <span>Please try another document, or improve snapshot quality.</span>

            <a href={"#/kyc/snapshot/" + type} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                <img src="/assets/images/camera-violet.png"/>
                <img src="/assets/images/camera-white.png"/>
                take another snapshot
            </a>
        </div>
    </div>
);

export default FailureSnapshot;

import React from 'react';

const SnapshotButton = ({type}) => (
    <div className="ga-anim-container">
        <a href={"#/kyc/snapshot/" + type} className="btn btn-round ga-but-snaphot ga-mt25 ga-anim-show-bottom ga-anim-d6">
            <img src="/assets/images/camera-white.png"/>
            <img src="/assets/images/camera-violet.png"/>
            Take another Snapshot
        </a>
    </div>
);

export default SnapshotButton;

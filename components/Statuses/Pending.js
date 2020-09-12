import React from 'react';

const Pending = () => (
    <div className="row">
        <div className="col-md-12 align-self-center justify-content-center text-center">
            <div className="ga-pending-container">
                <img src="assets/images/logo.png"/>
                <img className="ga-pending ga-anim-rotate" src="assets/images/pending.png"/>
            </div>

            <h3>Verification Pending</h3>
            <div className = "hidden-sm-down d-inline-flex justify-content-center" >
                <a href={"#/kyc/intro/FACE"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                    resubmit selfie
                </a>
                <a href={"#/kyc/intro/ID"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                    resubmit ID
                </a>
                <a href={"#/kyc/intro/POA"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                    resubmit POA
                </a>
            </div>
            <div className = "hidden-md-up" >
                <a href={"#/kyc/intro/FACE"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                    resubmit selfie
                </a>
                <a href={"#/kyc/intro/ID"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                    resubmit ID
                </a>
                <a href={"#/kyc/intro/POA"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                    resubmit POA
                </a>
            </div>
            <a href={"#/kyc/parsing"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                    review your data
                </a>
            <a href={"#/references/profile"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                go back to your profile
            </a>

            {/*<span>Text placeholder for pending verification</span>*/}
        </div>
    </div>
);

export default Pending;

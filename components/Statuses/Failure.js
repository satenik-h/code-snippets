import React from 'react';

const Failure = ({comment}) => (
    <div className="row">
        <div className="col-md-12 align-self-center justify-content-center text-center">
            <div className="ga-failure">
                <img className="ga-anim-show-scale" src="assets/images/logo.png"/>
                <img className="ga-warn ga-anim-show-scale ga-anim-d3" src="assets/images/warn.png"/>
            </div>

            <h3>Verification Failure</h3>
            {/*<p>Text placeholder if verification did not pass.</p>*/}
            <p>{comment}</p>
            
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
            
        </div>
    </div>
);

export default Failure;

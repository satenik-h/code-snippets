import React from 'react';

const Success = () => (
    <div className="row">
        <div className="col-md-12 align-self-center justify-content-center text-center">
            <div className="ga-success-container">
                <img className="ga-anim-show-scale" src="assets/images/logo-violet.png"/>
                <img className="ga-success ga-anim-show-scale ga-anim-d3" src="assets/images/verifi.png"/>
            </div>

            <h3>Verification Success!</h3>
            <span>Welcome Aboard!</span>
            
            <a href={"#/references/profile"} className="btn btn-round ga-but-camera ga-mt25 d-block ga-w300p mx-auto">
                go back to your profile
            </a>
        </div>
    </div>
);

export default Success;

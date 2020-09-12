import React from 'react';

import KycAcceptedDocs from './KycAcceptedDocs';

const KycIntro = ({type}) => {
    return (
        <div className="col-md-12 ga-kyc-intro-content ga-kyc-blue align-self-center ga-anim-show-bottom-opacity">
            <div className="row">
                <div className="col-md-12">
                    <h2>Anti Money Laundering Policy requires a KYC procedure for clients.</h2>
                </div>
            </div>

            <div className="row ga-mt50">
                <div className="col-md-5 text-lg-left text-md-left text-center">
                    <KycAcceptedDocs type={type}/>
                </div>

                <div className="col-md-7 text-center ga-left-border">
                    <img src="assets/images/camera.png" className="d-block mx-auto"/>
                    <a href={`#kyc/snapshot/${type}`} className="btn btn-round ga-but-camera ga-mt25">
                        <img src="/assets/images/camera-violet.png"/>
                        <img src="/assets/images/camera-white.png"/>
                        Take a snapshot using camera
                    </a>

                    {type !== "FACE" && (
                        <div>
                            <span className="d-block mx-auto ga-mt15 ga-mb15">or</span>,
                            <a href={`#kyc/upload/${type}`} className="btn btn-round ga-but-scan">
                                <img src="/assets/images/arrow-top-violet.png" />
                                <img src="/assets/images/arrow-top.png" />
                                Upload scanned document
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KycIntro;

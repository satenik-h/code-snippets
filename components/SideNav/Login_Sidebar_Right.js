import React from 'react';

import APPCONFIG from '../../constants/Config';

const Login_Sidebar_Right = ({current}) => {
    const getHelp = () => {
        let links = [
            {
                caption: "What is parsecfrontiers?",
                link: "https://help.parsecfrontiers.com/general-faq/what-is-parsecfrontiers"
            },
            {
                caption: "parsecfrontiers Pre-Token Sale",
                link: "https://help.parsecfrontiers.com/parsecfrontiers-token-sale/parsecfrontiers-pre-token-sale"
            },
            {
                caption: "Frequently Asked Questions",
                link: "https://help.parsecfrontiers.com/"
            },
        ];

        let result = [];
        for (let i = 0; i < links.length; i++) {
            result.push(
                <a className="color-purple-4" href={links[i].link} target="_blank" key={i}>
                    <li>{links[i].caption}</li>
                </a>
            );
        }

        return result;
    };

    return (
        <div className="login-sidebar full-height ph-30 d-md-flex flex-column justify-content-between">
            <div>
                <div className="brand pv-40">
                    <h1 className="mb-0 text-center">
                        <a href="https://parsecfrontiers.com">
                            <img src="/assets/logo-white.png" alt={APPCONFIG.brand}/>
                        </a>
                    </h1>
                </div>

                {(current === 'signup') && (
                    <div className="text-center text-md-left hidden-xs-up">
                        <h3 className="social-login-title m-0 text-white">Login via SSO</h3>

                        <div className="social-icons">
                            <a href="#" className="color-purple-4"><i className="fa fa-linkedin-square fa-2x"/></a>
                            <span className="space"/>
                            <a href="#" className="color-purple-4"><i className="fa fa-facebook-square fa-2x"/></a>
                            <span className="space"/>
                            <a href="#" className="color-purple-4"><i className="fa fa-twitter fa-2x"/></a>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <div className="position-relative d-lg-flex align-items-center">
                    <img className="shape-background" src="/assets/images/shape1.png"/>

                    <div className="text-center"><img src="/assets/images/frank.png" alt="Frank"/></div>

                    <div className="flex-3 text-center hidden-xs-up">
                        <h5 className="text-white">Have a Questions?</h5>

                        <a className="btn btn-round btn-white ask-frank d-flex align-items-center px-3 py-2 m-auto"
                           href="https://t.me/parsecfrontiers" target="_blank"
                        >
                            <img src="/assets/images/message.png"/>
                            <span className="space"/>
                            <span className="text-small">Ask Frank</span>
                        </a>
                    </div>
                </div>

                <ul className="questions pv-40 pl-3">
                    {getHelp()}
                </ul>

                <div className="pv-40 text-small color-purple-4">
                    <i>&copy; 2017 parsecfrontiers Limited </i><br/>
                    <i>Hong Kong</i>
                </div>
            </div>
        </div>
    );
};

export default Login_Sidebar_Right;

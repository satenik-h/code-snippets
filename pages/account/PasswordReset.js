import React, {Component} from 'react';

import FancyBox from '../../components/FancyBox';

export default class PasswordReset extends Component {
    render() {
        return (
            <FancyBox>
                <div className="card-content no-border">
                    <section className="logo text-center">
                        <h2 className="no-margin">Congratulations!</h2>
                        <span className="page-subtitle">Parsec Frontiers</span>
                    </section>

                    <div className="p-5"/>

                    <h5 className="mt-0 p-3 text-center">
                        Password has been successfully changed.
                    </h5>
                </div>

                <div className="card-action no-border text-center p-0">
                    <a href="#/account/login" className="btn btn-round btn-white btn-border px-3 py-2 m-0 text-small">
                        <i className="fa fa-chevron-left" /> Go to Login
                    </a>
                </div>
            </FancyBox>
        );
    }
}

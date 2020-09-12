import React, {Component} from 'react';

export default class Account extends Component {
    render() {
        const {children, location} = this.props;

        let links = location.pathname.split("/");
        let currentPage = links[links.length - 1];

        if (links.indexOf('email-confirmation') > -1 || links.indexOf('reset-password') > -1) {
            currentPage = 'confirm';
        } else if (links.indexOf('reset') > -1) {
            currentPage = 'reset';
        }

        return (
            <div className="main-app-container">
                <section id="page-container" className="app-page-container">
                    <div className="app-content-wrapper">
                        <div className="full-height d-md-flex">
                            <div className="flex-3">
                                <div className={"page-auth page-" + currentPage}>
                                    <div className="main-body">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

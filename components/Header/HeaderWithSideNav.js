import React, {Component} from 'react';

import NavRightList from './NavRightList/index';
import HeaderStatus from './HeaderStatus';

export default class HeaderWithSideNav extends Component {
    componentDidMount() {
        const {sidebarToggler} = this.refs;
        const $sidebarToggler = $(sidebarToggler);
        const $body = $('#body');

        $sidebarToggler.on('click', (e) => {
            // _sidebar.scss, _page-container.scss
            $body.toggleClass('sidebar-mobile-open');
        });
    }

    render() {
        return (
            <section className="app-header">
                <HeaderStatus/>

                <div className="app-header-inner bg-color-primary">
                    <div className="hidden-lg-up float-left">
                        <a href="javascript:"
                           className="md-button header-icon toggle-sidebar-btn"
                           ref="sidebarToggler"
                        >
                            <i className="material-icons">menu</i>
                        </a>
                    </div>

                    <div className="brand hidden-md-down">
                        <a href="https://parsecfrontiers.com/">
                            <img src="/assets/logo-white.png" alt="{APPCONFIG.brand}" height="40" />
                        </a>
                    </div>

                    <div className="top-nav-right">
                        <NavRightList/>
                    </div>
                </div>
            </section>
        );
    }
}

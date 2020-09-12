import React, {Component} from 'react';
import {hashHistory} from 'react-router';

import SideNavContent from './SideNavContent';
import APPCONFIG from '../../constants/Config';

export default class SideNav extends Component {
    componentDidMount() {
        // AutoCloseMobileNav
        const $body = $('#body');

        if (APPCONFIG.AutoCloseMobileNav) {
            hashHistory.listen((location) => {
                setTimeout(function () {
                    $body.removeClass('sidebar-mobile-open');
                }, 0);
            });
        }
    }

    render() {
        return (
            <nav className="app-sidebar bg-color-white box-shadow-none">
                <section className="sidebar-header bg-color-primary box-shadow-none">
                    <a href="https://parsecfrontiers.com">
                        <img src="/assets/logo-white.png" alt="{APPCONFIG.brand}" height="40"/>
                    </a>
                </section>

                <section className="sidebar-content">
                    <SideNavContent location={this.props.location}/>
                </section>

                <section className="sidebar-footer no-padding">
                    <div className="position-relative d-flex align-items-center">
                        <div className="ga-sp-animation">
                            <img className="ga-sp-anim-bg" src="assets/images/shape5.png"/>
                            <img className="ga-sp-anim-rocks" src="assets/images/rocks-mini.png"/>
                            <img className="sp-bird1" src="assets/images/bird-mini.png"/>
                            <img className="sp-bird2" src="assets/images/bird-mini.png"/>
                            <img className="sp-cloud1" src="assets/images/cloud-mini.png"/>
                            <img className="sp-cloud2" src="assets/images/cloud-mini-r.png"/>
                            <div className="ga-sp-train-mask">
                                <img className="sp-train" src="assets/images/train.png"/>
                            </div>
                        </div>
                    </div>
                </section>
            </nav>
        );
    }
}

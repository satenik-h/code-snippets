import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import SideNavContent from './SideNavContent';
import APPCONFIG from '../../constants/Config';


export default class SideCrowdsale extends Component {
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
            <nav className='app-sidebar bg-color-white box-shadow-none'>
                <section className="sidebar-header box-shadow-none">
                    <div className='ga-nav-title'>
                        <h2>Crowdsale</h2>
                    </div>
                </section>
            
                <section className='sidebar-content'>
                    <SideNavContent
                        location={this.props.location}
                    />
                </section>
            </nav>
        );
    }
}

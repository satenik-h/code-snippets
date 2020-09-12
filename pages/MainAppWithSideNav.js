import React, {Component} from 'react';

import Header from '../components/Header/index';
import SideNav from '../components/SideNav';
import SideDashboard from '../components/SideDashboard';
import SideWallet from '../components/SideWallet';
import SideCrowdsale from '../components/SideCrowdsale';
import SideKyc from '../components/SideKyc';


export default class MainAppWithSideNav extends Component {
    render() {
        const {children, location} = this.props;

        return (
            <div className="main-app-container">

            {
                (this.props.route.path === '/dashboard')
                ? (
                    <SideDashboard location={location} />
                )
                : (
                    (this.props.route.path === '/kyc')
                    ? (
                        <SideKyc location={location} />
                    )
                    : (
                        (this.props.route.path === '/wallet')
                        ? (
                            <SideWallet location={location} />
                        )
                        : (
                            (this.props.route.path === '/crowdsale')
                            ? (
                                <SideCrowdsale location={location} />
                            )
                            : (
                                <SideNav location={location} />
                            )
                        )
                    )
                )
            }

                <section id="page-container" className="app-page-container">
                    <Header/>

                    <div className="app-content-wrapper include-side-nav bg-gray">
                        <div className="app-content">
                            <div className="full-height">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

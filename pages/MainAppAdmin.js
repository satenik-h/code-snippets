import React, {Component} from 'react';

import Header from '../components/Header/index';

export default class MainAppAdmin extends Component {
    render() {
        const { children, location } = this.props;

        return (
            <div className="main-app-container">
                <section id="page-container" className="app-page-container">
                    <div className="bg-gray">
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

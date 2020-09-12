import React from 'react';

import SideKycContent from './SideKycContent';
// import InspectorAnim from '../Animations/InspectorAnim';

const SideKyc = ({location, type}) => (
    <nav className="app-sidebar bg-color-white box-shadow-none">
        <section className="sidebar-header box-shadow-none">
            <div className='ga-nav-title'>
                <h2>Verification</h2>
            </div>
        </section>

        <section className="sidebar-content">
            <SideKycContent location={location} type={type}/>
        </section>

        <section className="sidebar-footer no-padding">
            <div className="position-relative d-flex align-items-center">
                {/*<InspectorAnim />*/}
            </div>
        </section>
    </nav>
);

export default SideKyc;

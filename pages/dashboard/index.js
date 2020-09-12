import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { DashboardActions } from '../../redux/dashboard/actions';

import DashboardInfoView from './DashboardInfoView';


class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard-container'>
                {/*
                    (this.props.params.type === 'info')
                    ? (
                        <DashboardInfoView />
                    )
                    : (this.props.params.type === '')
                    ? (
                        <DashboardInfoView />
                    )
                    : ''
                */}
                <DashboardInfoView />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

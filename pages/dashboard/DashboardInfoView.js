import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Clipboard from 'react-clipboard.js';

import DashboardActions from '../../redux/dashboard/actions';

class DashboardInfoView extends Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        const { getRefereeCount, userId, userToken } = this.props;
        getRefereeCount({ userId, userToken });
    }

    componentWillReceiveProps(nextProps) {
    }
    
    getReferralLink = () => {
        return `${window.location.origin}/#/account/signup?refId=${this.props.userId}`;
    }

    render () {
        const { getReferralLink } = this;
        const { referrer, refereeCount } = this.props;
        return (
            <div className='content-form content-wrapper'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>Dashboard</h1>
                        <div className='row mt-4'>
                            <div className='col-12 info-block'>
                                <label className='crowdsale-heading'>
                                    Invite a friend via Referral link
                                    <Clipboard option-text={getReferralLink} component="a" button-title='Click to copy referral link.'>
                                        <i className="fa fa-copy ml-2" style={{ fontSize: 16, cursor: 'pointer' }}></i>
                                    </Clipboard>
                                </label>
                                <pre className='crowdsale-heading active boxed'>{ getReferralLink() }</pre>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-12 info-block'>
                                <h6>Referral Information</h6>
                                {
                                    referrer &&
                                    <h6>
                                        Registered by invitation from &nbsp;
                                        <span style={{ color: 'palegreen' }}>{referrer}</span>
                                    </h6>
                                }
                                <h6>
                                    Invited <span style={{ color: 'palegreen' }}>{refereeCount}</span> friends
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardInfoView.propTypes = {
    userToken: PropTypes.string,
    userId: PropTypes.string,
    referrer: PropTypes.string,
    refereeCount: PropTypes.number,
    getRefereeCount: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        referrer: state.userReducer.userData.referrer || '',
        refereeCount: state.dashboardReducer.refereeCount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRefereeCount: (req) => dispatch(DashboardActions.getRefereeCount(req.userId, req.userToken)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardInfoView);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';

import {PurchaseActions, AccountActions} from '../../../redux/app/actions';
import BigBoard from '../../../components/Common/BigBoard';
import BonusHistory from './BonusHistory';

class ReferralDashboard extends Component {
    componentWillMount() {
        this.props.getUserReferral({
            userId: this.props.userId,
            token: this.props.userToken,
        }).then(() => {
            this.forceUpdate();
        });

        if (!this.props.sales || !this.props.sales.token) {
            this.props.getTokenSales({
                token: this.props.userToken
            }).then(() => {
                this.forceUpdate();
            });
        }
    }

    render() {
        const {
            currencyQuotes,
            location,
            referralWallet,
            sales
        } = this.props;

        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <QueueAnim type="bottom" className="ui-animate">
                    <div key="1">
                        <h4 className="mt-0">Ambassador Dashboard</h4>
                    </div>

                    <BigBoard
                        location={location}
                        sales={sales}
                        wallet={referralWallet}
                        currencyQuotes={currencyQuotes}
                    />

                    <BonusHistory referralWallet={referralWallet}/>
                </QueueAnim>
            </div>
        );
    }
}

ReferralDashboard.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        referralWallet: state.userReducer.referralWallet,
        sales: state.purchaseReducer.sales,
        currencyQuotes: state.purchaseReducer.currencyQuotes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTokenSales: (req) => dispatch(PurchaseActions.getTokenSales(req.token)),
        getUserReferral: (req) => dispatch(AccountActions.getUserReferral(req.userId, req.token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferralDashboard);

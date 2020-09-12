import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';

import {AccountActions, PurchaseActions} from '../../../redux/app/actions';
import PurchaseIntroModal from '../../../components/Modals/PurchaseIntroModal';
import LoadingOverlay from '../../../components/Common/LoadingOverlay';

class PurchaseIntro extends Component {
    componentDidMount() {
        this.props.getSupportedCurrencies({
            type: 'crypto',
            token: this.props.token
        }).then(() => {
            if (this.props.restrictions === "no") {
                this.context.router.push('/purchase/currency');
            }
        });
    }

    startPurchase = () => {
        if (this.props.restrictions === "no") {
            this.context.router.push('/purchase/currency');
        }
    };

    updateUserProfile = (data) => {
        this.props.updateUserProfile({
            userId: this.props.userId,
            token: this.props.token,
            data
        }).then(() => {
            if (this.props.restrictions === "no") {
                this.context.router.push('/purchase/currency');
            }
        });
    };

    render() {
        const closedModal = this.props.residence && this.props.citizenship;
        const restricted = (this.props.restrictions !== "no");

        return (
            <div className="container-fluid no-breadcrumbs">
                <LoadingOverlay overlayClass={(this.props.loading) ? 'overlay show' : 'overlay'} message=""/>

                <QueueAnim type="bottom" className="ui-animate">
                    <div className="row" key="2">
                        <div className="col-md-10 offset-md-1">
                            <div className="card purchase-intro-card border-0 border-radius-2 box-shadow-none">
                                <div className="card-body px-3 px-md-5">
                                    <h5 className="p-md-4 mx-3 secondary text-center">
                                        Please be aware that account verification is required to unlock all purchased COIN deposits
                                    </h5>

                                    <div className="row mx-3 bt-gray-2">
                                        <div className="col-md-4 py-3 py-md-4 text-center">
                                            <img src="/assets/images/personal.png"/>
                                            <p className="mt-3 font-weight-medium color-dark-2">
                                                Your full name, phone number, address, date of birth
                                            </p>
                                        </div>

                                        <div className="col-md-4 py-3 py-md-4 text-center">
                                            <img src="/assets/images/residence.png"/>
                                            <p className="mt-3 font-weight-medium color-dark-2">
                                                Country of citizenship and residence
                                            </p>
                                        </div>

                                        <div className="col-md-4 py-3 py-md-4 text-center">
                                            <img src="/assets/images/passport.png"/>
                                            <p className="mt-3 font-weight-medium color-dark-2">
                                                As well as photo of passport (or other government issued identification)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row pb-4 mx-3 font-weight-medium color-dark-3">
                                        * In some cases a photo of valid proof of address document
                                    </div>
                                </div>

                                <div className="card-footer px-3 px-md-5 border-top-0 text-white">
                                    <h6 className="mx-3 my-2">
                                        These documents will be requested post sale prior to the distribution of the COIN tokens
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" key="3">
                        <div className="col-md-12 text-center">
                            <span className="text-danger">{this.props.error}</span>
                        </div>

                        {restricted && (
                            <div className="col-md-12 text-center">
                                <span className="text-danger">Unfortunately due to regulatory guidelines your residence or citizenship bars you from contributing to this token sale</span>
                            </div>
                        )}

                        <div className="col-md-4 offset-md-4">
                            {(!this.props.flashsaleOK)
                                ? (
                                    <button className="btn btn-round btn-disabled px-4 py-3 mt-4" disabled>
                                    </button>
                                )
                                : (
                                    <button className="btn btn-full btn-round primary"
                                            onClick={() => this.startPurchase()}
                                            disabled={this.props.loading || restricted}
                                    >
                                        Continue
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </QueueAnim>

                <PurchaseIntroModal closed={closedModal} updateUserProfile={this.updateUserProfile}/>
            </div>
        );
    }
}

PurchaseIntro.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.userId,
        token: state.userReducer.userToken,
        residence: state.userReducer.userData.residence,
        citizenship: state.userReducer.userData.citizenship,
        restrictions: state.userReducer.userData.restrictions,
        sales: state.purchaseReducer.sales,
        flashsaleOK: state.purchaseReducer.flashsaleTokenOK,
        loading: state.purchaseReducer.supportedCurrenciesLoading || state.userReducer.updateProfileLoading,
        error: state.purchaseReducer.supportedCurrenciesError || state.userReducer.updateProfileError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTokenSales: (req) => dispatch(PurchaseActions.getTokenSales(req.token)),
        getSupportedCurrencies: (req) => dispatch(PurchaseActions.getSupportedCurrencies(req.type, req.token)),
        updateUserProfile: (req) => dispatch(AccountActions.updateUserProfile(req.data, req.token, req.userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseIntro);

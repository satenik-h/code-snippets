import React, {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';

import {PurchaseActions} from '../../../redux/app/actions';
import ICOStep from '../../../components/Common/ICOStep';
import ProgressSlider from './ProgressSlider';
import PreSaleDetails from './PreSaleDetails';
import Countdown from '../../../components/Common/Countdown';
import LoadingOverlay from '../../../components/Common/LoadingOverlay';
import PreSaleEndModal from '../../../components/Modals/PreSaleEndModal';

class PreICO extends Component {
    componentWillMount() {
        this.props.getTokenSales({
            token: this.props.userToken
        });
    }

    toggleDetails = (e) => {
        $(e.target).toggleClass("arrow-up");
        $('.timeline-table').slideToggle();
        this.setState({
            details: 1 - this.state.details
        });
    };

    verifyFlashsaleCode = (code) => {
        this.props.verifyFlashsaleCode({
            token: this.props.userToken,
            code
        });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.props.flashsaleOK)
                    resolve();
                else
                    reject();
            }, 500)
        });
    };

    showFlashsaleModal = () => {
        this.flashsaleModal.showModal();
    };

    render() {
        let progress = 0;
        let max_cap = 50000000;
        if (this.props.sales && this.props.sales.token) {
            progress = Math.max(0, Math.min(100, this.props.sales.token.sold / max_cap * 100));
            if (progress > 100)
                progress = 100;
        }

        return (
            <div className="container-fluid no-breadcrumbs">
                <LoadingOverlay overlayClass={this.props.loading ? 'overlay show' : 'overlay'} message=""/>

                <QueueAnim type="bottom" className="ui-animate">
                    <div key="1">
                        <h4 className="mt-0 mb-1">Pre-Token Sale Timeline</h4>
                        <h6 className="m-0 font-weight-light color-dark-3">Current Token Sale Progress</h6>
                    </div>

                    <div className="row" key="2">
                        <div className="col-xl-10 offset-xl-1">
                            <ProgressSlider progress={progress}/>
                        </div>
                    </div>

                    {!this.state.details && (
                        <PreSaleDetails
                            sales={this.props.sales}
                            flashsaleOK={this.props.flashsaleOK}
                            modalOn={this.showFlashsaleModal}
                        />
                    )}

                    <div className="position-relative timeline" key="4">
                        <div className="timeline-details">
                            <div className="mt--1 text-center">
                                <a className="toggle text-small" data-toggle="collapse"
                                   onClick={(e) => this.toggleDetails(e)}>
                                    {this.state.details ? "Less Details" : "More Details"}
                                </a>
                            </div>

                            <ICOStep sales={this.props.sales} saleOK={this.props.flashsaleTokenOK} />

                            <h4 className="font-weight-normal text-center hidden-xs-up">
                                Pre-Token Sale will be finished after:
                            </h4>

                            <div className="pt-3 pb-5 text-center hidden-xs-up">
                                <Countdown date="01/01/2018 00:00 AM"/>
                            </div>
                        </div>
                    </div>
                </QueueAnim>

                <PreSaleEndModal opened={false}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        sales: state.purchaseReducer.sales,
        flashsaleOK: state.purchaseReducer.flashsaleTokenOK,
        loading: state.purchaseReducer.getTokenSalesLoading,
        error: state.purchaseReducer.getTokenSalesError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTokenSales: (req) => dispatch(PurchaseActions.getTokenSales(req.token)),
        verifyFlashsaleCode: (req) => dispatch(PurchaseActions.verifyFlashsaleCode(req.token, req.code))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PreICO);

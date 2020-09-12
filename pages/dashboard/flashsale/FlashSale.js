import React, {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';

// import {PurchaseActions} from '../../../redux/app/actions';
// import FlashSaleSlider from './FlashSaleSlider';
// import FlashSaleDetails from './FlashSaleDetails';
// import ICOStep from '../../../components/Common/ICOStep';
// import Countdown from '../../../components/Common/Countdown';
// import LoadingOverlay from '../../../components/Common/LoadingOverlay';
// import PreSaleEndModal from '../../../components/Modals/PreSaleEndModal';
// import PreSaleTFAModal from '../../../components/Modals/PreSaleTFAModal';

class FlashSale extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     details: false,
        //     showFlashsaleModal: false,
        //     flashsaleModalError: ""
        // };
    }

    componentWillMount() {
        // if (this.props.flashsaleTokenOK === null) {
        //     this.props.verifyFlashsaleCode({
        //         token: this.props.userToken,
        //         code: this.props.flashsaleToken,
        //     }).then(() => {
        //         if (this.props.flashsaleTokenOK === false) {
        //             this.setState({
        //                 showFlashsaleModal: true
        //             });
        //         }
        //     });
        // }
    }
    //
    // toggleDetails = (e) => {
    //     $(e.target).toggleClass("arrow-up");
    //     $('.timeline-table').slideToggle();
    //     this.setState({
    //         details: !this.state.details
    //     });
    // };
    //
    // verifyFlashsaleCode = code => {
    //     this.props.verifyFlashsaleCode({
    //         token: this.props.userToken,
    //         code
    //     }).then(() => {
    //         this.setState({
    //             showFlashsaleModal: !this.props.flashsaleTokenOK,
    //             errorText: this.props.flashsaleTokenOK ? "" : "Wrong password!"
    //         });
    //     });
    // };
    //
    // closeFlashsaleModal = () => {
    //     this.setState({
    //         showFlashsaleModal: false
    //     });
    // };

    render() {
        // let progress = 0;
        // let max_cap = 50000000;
        // if (this.props.sales && this.props.sales.token) {
        //     progress = Math.max(0, Math.min(100, (max_cap - this.props.sales.token.stock) / max_cap * 100));
        //     if (progress > 100)
        //         progress = 100;
        // }

        return (
            <div className="container-fluid no-breadcrumbs">
                {/*<LoadingOverlay overlayClass={!this.props.sales ? 'overlay show' : 'overlay'} message=""/>*/}

                {/*<PreSaleTFAModal*/}
                    {/*verifyFlashsaleCode={this.verifyFlashsaleCode}*/}
                    {/*isOpen={this.state.showFlashsaleModal}*/}
                    {/*closeModal={this.closeFlashsaleModal}*/}
                    {/*errorText={this.state.flashsaleModalError}*/}
                {/*/>*/}

                {/*<QueueAnim type="bottom" className="ui-animate">*/}
                    {/*<div key="1">*/}
                        {/*<h4 className="mt-0 mb-1">Main Token Sale</h4>*/}
                        {/*<h6 className="m-0 font-weight-light color-dark-3">Current Token Sale Progress</h6>*/}
                    {/*</div>*/}

                    {/*<div className="row" key="2">*/}
                        {/*<div className="col-xl-10 offset-xl-1">*/}
                            {/*<FlashSaleSlider*/}
                                {/*progress={progress}*/}
                                {/*basePrice={this.props.sales && this.props.sales.token && this.props.sales.token.price / 100}*/}
                            {/*/>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*{this.props.sales && (*/}
                        {/*<FlashSaleDetails*/}
                            {/*sales={this.props.sales}*/}
                            {/*flashsaleTokenOK={this.props.flashsaleTokenOK}*/}
                            {/*modalOn={this.showFlashsaleModal}*/}
                        {/*/>*/}
                    {/*)}*/}

                    {/*<div className="position-relative timeline" key="4">*/}
                        {/*<div className="timeline-details">*/}
                            {/*<div className="mt--1 text-center">*/}
                                {/*<a className="toggle text-small" data-toggle="collapse" onClick={(e) => this.toggleDetails(e)}>*/}
                                    {/*{this.state.details ? "Less Details" : "More Details"}*/}
                                {/*</a>*/}
                            {/*</div>*/}

                            {/*<ICOStep sales={this.props.sales} saleOK={this.props.flashsaleTokenOK} />*/}

                            {/*<h4 className="font-weight-normal text-center hidden-xs-up">*/}
                                {/*Pre-Token Sale will be finished after:*/}
                            {/*</h4>*/}

                            {/*<div className="pt-3 pb-5 text-center hidden-xs-up">*/}
                                {/*<Countdown date="01/01/2018 00:00 AM"/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</QueueAnim>*/}

                {/*<PreSaleEndModal opened={false}/>*/}
                Welcome to Parsec Frontiers
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // userToken: state.userReducer.userToken,
        // sales: state.purchaseReducer.sales,
        // flashsaleTokenOK: state.purchaseReducer.flashsaleTokenOK,
        // flashsaleToken: state.purchaseReducer.flashsaleToken,
        // loading: state.purchaseReducer.getTokenSalesLoading,
        // error: state.purchaseReducer.getTokenSalesError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getTokenSales: (req) => dispatch(PurchaseActions.getTokenSales(req.token)),
        // verifyFlashsaleCode: (req) => dispatch(PurchaseActions.verifyFlashsaleCode(req.token, req.code))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashSale);

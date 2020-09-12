import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { CrowdsaleActions } from '../../redux/crowdsale/actions';

import CrowdsaleInfoView from './CrowdsaleInfoView';


class Crowdsale extends Component {
    render() {
        return (
            <div className='wallet-container'>
                {/*
                    (this.props.params.type === 'saleinfo')
                    ? (
                        <ViewInfo />
                    )
                    : (this.props.params.type === '')
                    ? (
                        <WalletDisplay />
                    )
                    : ''
                */}
                <CrowdsaleInfoView />
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

export default connect(mapStateToProps, mapDispatchToProps)(Crowdsale);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WalletActions } from '../../redux/app/actions';

import WalletCreate from './WalletCreate';
import WalletInfoView from './WalletInfoView';
import SendCoin from './SendCoin';


class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state={
            walletCreated: props.walletAddress === (null || undefined) ? false : true,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            walletCreated: nextProps.walletAddress !== (null || undefined) ? true : false,
        });
    }

    componentDidMount() {
        this.getWallet();
    }

    getWallet = () => {
        const { userId, userToken, getWallet } = this.props;

        getWallet({
            userId: userId,
            token: userToken
        });
    }

    render() {
        const { walletCreated } = this.state;

        return (
            <div className='wallet-container'>
            {
                !walletCreated &&
                <WalletCreate />
            }
            {
                walletCreated &&
                <WalletInfoView />
            }
            </div>
        );
    }
}

Wallet.propTypes = {
    userId: PropTypes.string,
    userToken: PropTypes.string,
    walletAddress: PropTypes.string,
    getWallet: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        walletAddress: state.walletReducer.walletAddress,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getWallet: (req) => dispatch(WalletActions.getWallet(req.userId, req.token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

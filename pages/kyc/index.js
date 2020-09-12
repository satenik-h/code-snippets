import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KycActions } from '../../redux/app/actions';

import KycInfoView from './KycInfoView';


class Kyc extends Component {
    render() {
        return (
            <div className='wallet-container'>
                <KycInfoView /> 
            </div>
        );
    }
}

Kyc.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kyc);

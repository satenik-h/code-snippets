import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import 'font-awesome/css/font-awesome.css';

import './_loadingOverlay.css';

class LoadingOverlay extends Component {
    render() {
        return (
            <div className={this.props.overlayClass}>
                <i className="fa fa-spinner fa-spin-custom" aria-hidden="true"/>
                <h3>{this.props.message}</h3>
            </div>
        )
    }
}

LoadingOverlay.propTypes = {
    overlayClass: PropTypes.string.isRequired,
    message: PropTypes.string
};

export default LoadingOverlay;

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Pending from '../../components/Statuses/Pending';
import Failure from '../../components/Statuses/Failure';
import Success from '../../components/Statuses/Success';
import FailureSnapshot from '../../components/Statuses/FailureSnapshot';

class KycStatus extends Component {
    componentDidMount() {
        if (this.props.status === "none") {
            this.context.router.push("/kyc/intro/FACE");
        }
    }

    getComponentByStatus = (status) => {
        switch (status) {
            case "pending":
                return <Pending/>;
            case "failure":
                return <Failure comment={this.props.comment} type={this.props.type}/>;
            case "success":
                return <Success/>;
            case "failureSnapshot":
                return <FailureSnapshot type={this.props.type}/>;
            default:
                return null;
        }
    };

    render() {
        return (
            <div className="col-md-12 ga-kyc-status ga-kyc-white align-self-center ga-anim-show-bottom-opacity">
                {this.getComponentByStatus(this.props.status)}
            </div>
        )
    }
}

KycStatus.contextTypes = {
    router: PropTypes.object.isRequired
};

export default KycStatus;

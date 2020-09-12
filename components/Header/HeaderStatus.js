import React, {Component} from 'react';
import Malarquee from 'react-malarquee'
import {connect} from 'react-redux';

class HeaderStatus extends Component {
    getCurrentStatus = currencyQuotes => {
        let result = [];
        for (let name in currencyQuotes)
            if (currencyQuotes.hasOwnProperty(name) && name.indexOf('PSRC') < 0)
                result.push(
                    <span className="px-3 d-inline-block text-small font-weight-bold text-uppercase" key={name}>
                        {name.substring(0, 3)}/{name.substring(3, 6)} {currencyQuotes[name]}
                    </span>
                );
        return result;
    };

    render() {
        return (
            <div className="app-header-status d-md-flex justify-content-start align-items-center">
                {this.props.currencyQuotes &&
                    <Malarquee rate="60">
                        {this.getCurrentStatus(this.props.currencyQuotes)}
                    </Malarquee>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currencyQuotes: state.purchaseReducer.currencyQuotes
    };
};

export default connect(mapStateToProps)(HeaderStatus);

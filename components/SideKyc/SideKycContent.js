import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {Document, Page} from 'react-pdf/build/entry.noworker';

import {KycActions} from '../../redux/app/actions';
import SnapshotButton from './SnapshotButton';

class SideKycContent extends Component {
    componentDidMount() {
        const {getTitle} = this.props;
        this.pathname = hashHistory.getCurrentLocation().pathname;

        getTitle(this.pathname);

        hashHistory.listen(location => {
            this.pathname = hashHistory.getCurrentLocation().pathname;
            getTitle(this.pathname);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notificationFor) {
            if (this.pathname !== nextProps.notificationFor) {
                this.props.changeNotification({status: "", message: "", description: "", notificationFor: ""});
            }
        }
    }

    getComponentByPath = () => {
        const {pathname} = hashHistory.getCurrentLocation();

        switch (pathname) {
            // case "/kyc/parsing": {return <SnapshotButton/>}
            default:
                return '';
        }
    };

    drawNotifications = () => {
        const {message, description, button} = this.props;
        let but;

        if (button === 'snapshot') {
            but = <SnapshotButton type={this.props.type}/>;
        }

        if (message) {
            return (
                <div>
                    <div className="ga-kyc-notifications-container" id="kycNotifi">
                        <div className="ga-kyc-notifications ga-anim-show-bottom ga-anim-d3" id="kycNotifi">
                            <i className="fa fa-times" aria-hidden="true"/>
                            <span><strong>{message}</strong>{description}</span>
                        </div>
                    </div>
                    {but}
                </div>
            );
        }
    };

    renderDocumentOrImage = (type) => {
        if (this.props[`${type}url`]) { //this.props.status !== "none" &&
            const ext = this.props[`${type}url`].split("?")[0].split(".").pop();
            if (ext === "pdf") {
                return (
                    <a href={"#/kyc/intro/" + type} className="ga-kyc-snap-sub">
                        <Document file={this.props[`${type}url`]}>
                            <Page pageNumber={1}/>
                        </Document>
                    </a>
                );
            }

            return (
                <a href={"#/kyc/intro/" + type} className="ga-kyc-snap-sub">
                    <img src={this.props[`${type}url`]}/>
                </a>
            );
        }

        return null;
    };

    render() {
        return (
            <div className="ga-kyc ga-sec-prof ga-posr">
                <div className="ga-kytc-title">
                    <span>{this.props.currentTitle}</span>
                </div>

                {this.drawNotifications()}

                <div className="ga-kyc-snapshots">
                    {this.renderDocumentOrImage("FACE")}

                    {this.renderDocumentOrImage("ID")}

                    {this.renderDocumentOrImage("POA")}
                </div>

                {this.getComponentByPath()}
            </div>
        );
    }
}

SideKycContent.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        status: state.kycReducer.status,
        currentTitle: state.kycReducer.currentTitle,
        message: state.kycReducer.notification,
        description: state.kycReducer.notificationDescription,
        button: state.kycReducer.notificationButton,
        notificationFor: state.kycReducer.notificationFor,
        FACEurl: state.kycReducer.FACEurl,
        IDurl: state.kycReducer.IDurl,
        POAurl: state.kycReducer.POAurl
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTitle: (path) => dispatch(KycActions.getTitle(path)),
        changeNotification: (notification) => dispatch(KycActions.changeNotification(notification))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideKycContent);

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {KycActions} from '../../redux/app/actions';
import PreviewBox from '../../components/kyc/PreviewBox';

class KycPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [
                {id: 0, name: "Utility_Bill_10-19-2018_41DA1GASD.PDF", link: '', deleting: false},
                {id: 1, name: "Bank Statement.PDF", link: '', deleting: false}
            ]
        };
    }

    componentDidMount() {
        this.props.getDocuments({
            token: this.props.userToken,
            cb: (result) => {
                console.log(result);
            }
        });
    }

    openStatus = (e) => {
        e.preventDefault();

        this.props.changeNotification({
            status: "pending",
            message: "",
            button: "",
            description: "",
            for: "/kyc/status"
        });

        this.context.router.push('/kyc/status');
    };

    deleteItem = (e) => {
        let id = e.target.dataset.id;

        const files = this.state.files;
        files[id] = {
            id: files[e.target.dataset.id].id,
            name: files[e.target.dataset.id].name,
            link: files[e.target.dataset.id].link,
            deleting: true
        };

        this.setState({files});

        this.props.deleteDocument({
            file: id,
            token: this.props.userToken,
            cb: (result) => {
                delete files[id];
                this.setState({files});
            }
        });
    };

    render() {
        return (
            <div className="col-md-12 ga-kyc-intro-content ga-kyc-white align-self-center ga-anim-show-bottom-opacity">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="ga-color-gray ga-mb40">Additionally, Proof of Address document is required</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 text-lg-left text-md-left text-center">
                        <img src="assets/images/proof.png"/>

                        <h3>Proof of Address (POA)</h3>

                        <ul>
                            <li><img src="assets/images/vv.png"/> Utility Bill</li>
                            <li><img src="assets/images/vv.png"/> Bank Statement</li>
                        </ul>

                        <a href="#/kyc/poa" className="btn btn-round ga-but-blue ga-ab">
                            <i className="fa fa-arrow-up" aria-hidden="true"/> Upload Another File
                        </a>
                    </div>

                    <div className="col-md-7 text-center ga-left-border ga-pl50" id="fileUpload">
                        <div className="ga-files-preview">
                            {this.state.files.map((item, i) => {
                                return (
                                    <PreviewBox deleteItem={this.deleteItem} key={i} id={i} item={item}/>
                                );
                            })}
                        </div>

                        <a href="#" className="btn btn-round ga-but-violet ga-w150p ga-fs14 ga-mt40" onClick={this.openStatus}>
                            <i className="material-icons">done</i> Confirm
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

KycPreview.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDocuments: (req) => dispatch(KycActions.getDocuments(req.token, req.cb)),
        changeNotification: (notification) => dispatch(KycActions.changeNotification(notification)),
        deleteDocument: (req) => dispatch(KycActions.deleteDocument(req.file, req.token, req.cb))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KycPreview);

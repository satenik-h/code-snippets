import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import {KycActions} from '../../redux/app/actions';
import LoadingAnim from '../../components/Animations/LoadingAnim';

class KycPoa extends Component {
    onDrop = (acceptedFiles, rejectedFiles) => {
        this.props.uploadDocument({
            files: acceptedFiles,
            token: this.props.userToken,
            cb: (result) => {
                this.context.router.push('/kyc/preview');
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
                            <li><img src="assets/images/vv.png" alt=""/> Utility bill</li>
                            <li><img src="assets/images/vv.png" alt=""/> Bank statement</li>
                        </ul>

                        <a href="#/kyc/intro" className="btn btn-round ga-but-blue ga-w150p ga-ab">
                            <i className="fa fa-chevron-left" aria-hidden="true"/> back
                        </a>
                    </div>

                    <div className="col-md-7 text-center ga-left-border ga-pl50 ga-posr" id="fileUpload">
                        {this.props.documentUploading && (
                            <LoadingAnim message="Documents uploading..." className="ga-loader-white"/>
                        )}

                        <div className="ga-kyc-error-container">
                            <div className={`ga-kyc-error ${(this.props.documentUploadingError) ? 'active' : ''}`}>
                                {this.props.documentUploadingError} <i className="fa fa-times" aria-hidden="true"/>
                            </div>
                        </div>

                        <div className="ga-dropzone-poa">
                            <Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)}>
                                <div className="ga-dropzone-descr">
                                    <p>Try dropping some files here</p>
                                    <p>or</p>
                                    <p>click to select files to upload</p>
                                </div>
                            </Dropzone>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

KycPoa.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        documentUploadingError: state.kycReducer.documentUploadingError,
        documentUploading: state.kycReducer.documentUploading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadDocument: (req) => dispatch(KycActions.uploadDocument(req.files, req.token, req.cb))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KycPoa);

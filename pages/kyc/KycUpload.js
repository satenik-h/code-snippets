import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import {KycActions} from '../../redux/app/actions';
import LoadingAnim from '../../components/Animations/LoadingAnim';
import KycAcceptedDocs from './KycAcceptedDocs';

class KycUpload extends Component {
    componentDidMount() {
        this.props.uploadDocumentClearError();

        if (this.props.type === "FACE") {
            this.context.router.push('/kyc/snapshot/FACE');
        }
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        if (!acceptedFiles || acceptedFiles.length !== 1)
            return;

        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        // acceptedFiles[0].name = this.props.type;

        this.props.uploadDocument({
            files: acceptedFiles,
            type: this.props.type,
            docType: this.docs.docType(),
            token: this.props.userToken,
            cb: () => {
                if (!this.props.idLoaded) {
                    this.context.router.push("/kyc/intro/ID");
                } else if (!this.props.poaLoaded) {
                    this.context.router.push("/kyc/intro/POA");
                } else {
                    this.context.router.push("/kyc/parsing");
                }
            }
        });
    };

    render() {
        return (
            <div className="col-md-12 ga-kyc-intro-content ga-kyc-white align-self-center ga-anim-show-bottom-opacity">
                <div className="row">
                    <div className="col-md-5 text-lg-left text-md-left text-center">
                        <KycAcceptedDocs ref={(docs) => this.docs = docs} type={this.props.type}/>

                        <a href={`#/kyc/snapshot/${this.props.type}`} className="btn btn-round ga-but-camera ga-90w ga-ab">
                            <img src="/assets/images/camera-violet.png"/>
                            <img src="/assets/images/camera-white.png"/>
                            Take snapshot instead
                        </a>
                    </div>

                    <div className="col-md-7 text-center ga-left-border ga-pl50 ga-posr" id="fileUpload">
                        {this.props.documentUploading && (
                            <LoadingAnim message="Documents uploading..." className="ga-loader-white"/>
                        )}

                        <div className="ga-kyc-error-container align-items-center">
                            <div className={`ga-kyc-error ${(this.props.documentUploadingError) ? 'active' : ''}`}>
                                {this.props.documentUploadingError}<i className="fa fa-times" aria-hidden="true"/>
                            </div>
                        </div>

                        <div className="ga-dropzone">
                            <Dropzone accept="image/jpeg, image/png, application/pdf" multiple={false} onDrop={this.onDrop}>
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

KycUpload.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        idLoaded: state.kycReducer.idLoaded,
        poaLoaded: state.kycReducer.poaLoaded,
        documentUploadingError: state.kycReducer.documentUploadingError,
        documentUploading: state.kycReducer.documentUploading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadDocument: (req) => dispatch(KycActions.uploadDocument(req.files, req.type, req.docType, req.token, req.cb)),
        uploadDocumentClearError: () => dispatch(KycActions.uploadDocumentClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KycUpload);

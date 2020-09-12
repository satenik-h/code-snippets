import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {KycActions} from '../../redux/app/actions';
import KycAcceptedDocs from './KycAcceptedDocs';
import LoadingAnim from '../../components/Animations/LoadingAnim';

class KycSnapshot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageAnalysis: false,
            devices: []
        };
    }

    componentDidMount() {
        this.videoElement = this.refs.video;
        this.videoSelect = this.refs.videoSource;

        navigator.mediaDevices.enumerateDevices()
            .then(this.gotDevices)
            .then(this.getStream)
            .catch(this.handleError);
    }

    gotDevices = (deviceInfos) => {
        let devices = [];
        deviceInfos.forEach(function (deviceInfo) {
            if (deviceInfo.kind === "videoinput") {
                devices.push({
                    label: deviceInfo.label || 'camera ' + (devices.length + 1),
                    value: deviceInfo.deviceId
                });
            }
        });

        if (JSON.stringify(devices) !== JSON.stringify(this.state.devices)) {
            this.setState({
                devices
            });
        }
    };

    getImageLightness = (context, width, height, callback) => {
        let colorSum = 0;
        let imageData = context.getImageData(0, 0, width, height);
        let data = imageData.data;
        let r, g, b, avg;

        for (let x = 0, len = data.length; x < len; x += 4) {
            r = data[x];
            g = data[x + 1];
            b = data[x + 2];

            avg = Math.floor((r + g + b) / 3);
            colorSum += avg;
        }

        let brightness = Math.floor(colorSum / (width * height));
        callback(brightness);
    };

    takeSnapshot = (e) => {
        e.preventDefault();

        this.setState({imageAnalysis: true});

        // let img = document.createElement('img');
        // let div = document.querySelector(`div#kycSnaps${this.props.type}`);
        // if (!div) {
        //     div = document.querySelector('div#kycSnaps').appendChild(document.createElement("div"));
        //     div.id = `kycSnaps${this.props.type}`;
        //     div.onclick = () => this.context.router.push(`/kyc/intro/${this.props.type}`);
        //     div.className = "ga-kyc-snap-sub";
        // } else {
        //     div.innerHTML = '';
        // }

        let width = this.videoElement.offsetWidth * 3;
        let height = this.videoElement.offsetHeight * 3;

        this.canvas = this.canvas || document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;

        let context = this.canvas.getContext('2d');
        context.drawImage(this.videoElement, 0, 0, width, height);

        this.getImageLightness(context, width, height, (brightness) => {
            if (brightness > 50) {
                // img.src = this.canvas.toDataURL('image/jpeg', 0.92);
                // snapshots.innerHTML = '';
                // div.appendChild(img);

                this.canvas.toBlob((result) => {
                    result.name = `${this.props.type}.jpg`;
                    this.props.uploadDocument({
                        files: [result],
                        type: this.props.type,
                        docType: this.docs.docType(),
                        token: this.props.userToken,
                        cb: () => {
                            this.stopStream();
                            if (!this.props.idLoaded) {
                                this.context.router.push("/kyc/intro/ID");
                            } else if (!this.props.poaLoaded) {
                                this.context.router.push("/kyc/intro/POA");
                            } else {
                                this.context.router.push("/kyc/parsing");
                            }
                        }
                    });
                });
            } else {
                // snapshots.innerHTML = '';

                this.props.changeNotification({
                    status: "failureSnapshot",
                    message: "Uploaded Snapshot is too dark or empty",
                    button: "snapshot",
                    description: "Please add more lighting during shooting process.",
                    for: "/kyc/status/" + this.props.type
                });

                this.stopStream();
                this.context.router.push('/kyc/status/' + this.props.type);
            }
        });
    };

    getStream = () => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        this.stopStream();

        let constraints = {
            video: {
                deviceId: {exact: this.videoSelect.value},
                video: {width: 1280, height: 720}
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(this.gotStream)
            .catch(this.handleError);
    };

    gotStream = (stream) => {
        window.stream = stream;
        this.videoElement.setAttribute('autoplay', '');
        this.videoElement.setAttribute('muted', '');
        this.videoElement.setAttribute('playsinline', '');
        this.videoElement.srcObject = stream;
    };

    componentWillUnmount() {
        this.stopStream();
    }

    stopStream = () => {
        if (window.stream) {
            window.stream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
    };

    handleError = (error) => {
        console.log('Error: ', error);
    };

    getDevices = () => {
        let result = [];
        this.state.devices.forEach(function (deviceInfo, index) {
            result.push(
                <option key={index} value={deviceInfo.value}>{deviceInfo.label}</option>
            );
        });

        return result;
    };

    render() {
        const {type} = this.props;

        return (
            <div className="col-md-12 ga-kyc-intro-content ga-kyc-blue align-self-center ga-anim-show-bottom-opacity">
                <div className="row">
                    <div className="col-md-5 text-lg-left text-md-left text-center">
                        <KycAcceptedDocs ref={(docs)=>this.docs=docs} type={this.props.type}/>

                        {type !== "FACE" && (
                            <a href={`#kyc/upload/${type}`} className="btn btn-round ga-but-scan ga-90w ga-ab">
                                <img src="/assets/images/arrow-top-violet.png"/>
                                <img src="/assets/images/arrow-top.png"/>
                                Upload scanned document
                            </a>
                        )}
                    </div>

                    <div className="col-md-7 text-center ga-left-border ga-pl50">
                        {this.state.imageAnalysis && (
                            <LoadingAnim message="Image analysis" className="ga-loader-blue"/>
                        )}

                        <div className="ga-capture-view">
                            <img className="ga-capture-tl" src="assets/images/capture-shape.png"/>
                            <img className="ga-capture-tr" src="assets/images/capture-shape.png"/>
                            <img className="ga-capture-bl" src="assets/images/capture-shape.png"/>
                            <img className="ga-capture-br" src="assets/images/capture-shape.png"/>
                            <img className="ga-capture-camera" src="assets/images/camera-blue.png"/>
                            <div className="ga-video-device">
                                <select ref="videoSource" onChange={this.getStream}>
                                    {this.getDevices()}
                                </select>
                            </div>
                            <video ref="video" muted autoPlay/>
                        </div>

                        <a href="#" className="btn btn-round ga-but-camera ga-vide-size ga-mt25" onClick={this.takeSnapshot}>
                            <img src="/assets/images/camera-violet.png"/>
                            <img src="/assets/images/camera-white.png"/>
                            Capture
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

KycSnapshot.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        idLoaded: state.kycReducer.idLoaded,
        poaLoaded: state.kycReducer.poaLoaded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadDocument: (req) => dispatch(KycActions.uploadDocument(req.files, req.type, req.docType, req.token, req.cb)),
        changeNotification: (notification) => dispatch(KycActions.changeNotification(notification))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KycSnapshot);

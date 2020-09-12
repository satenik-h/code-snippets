import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactPhoneInput from 'react-phone-input';
import { CountryDropdown } from 'react-country-region-selector';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import { KycActions, CrowdsaleActions } from '../../redux/app/actions';
const avatarPlaceholder = '../../assets/images/user_avatar.png';
const cardPlaceholder = '../../assets/images/id_card.png';
const accreditedPlaceholder = '../../assets/images/accredited_doc.png';


class KycInfoView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            dob: '1990-01-01',
            country: '',
            phoneNo: '',
            profileImgFile: null,
            profilePreviewUrl: '',
            cardType: 'passport',
            frontImgFile: null,
            frontPreviewUrl: '',
            backImgFile: null,
            backPreviewUrl: '',
            passportImgFile: null,
            investorDocPreviewUrl: '',
            investorDocFile: null,
            passportPreviewUrl: '',
            driversLicenseImgFile: null,
            driversLicensePreviewUrl: '',
            stepFinished1: false,
            stepFinished3: false,
            isUS: false,
            formFilled: false,
            imgError: '',
        }
    }

    componentWillMount() {
        const { getCrowdsaleInvestorStatus, resetStatus, userId, userToken } = this.props;
        
        resetStatus();
        getCrowdsaleInvestorStatus({
            userId: userId,
            token: userToken,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.verifying && this.props.verifying !== nextProps.verifying) {
            const { getCrowdsaleInvestorStatus, userId, userToken } = nextProps;
            getCrowdsaleInvestorStatus({
                userId: userId,
                token: userToken,
            });
        }
    }

    getKycStatus = () => {
        if (!this.props.investorStatusData) return 'Verification needed';
        const kycStatusFromShufti = this.props.investorStatusData.kycStatusFromShufti;
        const { crowdsaleInvestorStatusGetting, verifying } = this.props;
        if (crowdsaleInvestorStatusGetting) return 'Reading information from server...';
        if (verifying) return 'Verifying...';
        if (kycStatusFromShufti === 0) return 'Verification needed';
        if (kycStatusFromShufti === 1) return 'Pending';
        if (kycStatusFromShufti === 2) return 'Verified';
        if (kycStatusFromShufti === 3) return 'Verification failed';
        return 'Verification needed';
    }

    onInputChange = (e) => {
        const { id, value } = e.target;

        switch (id) {
            case 'firstname':
                this.setState({
                    firstname: value,
                });
                break;
            case 'lastname':
                this.setState({
                    lastname: value,
                });
                break;
            case 'dob':
                this.setState({
                    dob: value,
                });
                break;
            case 'country':
                this.setState({
                    country: value,
                });
                break;
            case 'phoneNo':
                this.setState({
                    phoneNo: value,
                });
                break;
            default:
                break;
        }
    }

    onUpload = (e) => {
        const { id } = e.target;

        switch (id) {
            case 'profile':
                this.refs.profileImgUploader.click();
                break;
            case 'frontIdImg':
                this.refs.frontIdImgUploader.click();
                break;
            case 'backIdImg':
                this.refs.backIdImgUploader.click();
                break;
            case 'passportImg':
                this.refs.passportImgUploader.click();
                break;
            case 'investorDoc':
                this.refs.investorDocUploader.click();
                break;
            case 'driversLicenseImg':
                this.refs.driversLicenseImgUploader.click();
                break;
            default:
                break;
        }
    }

    onImgFileChange = (e) => {
        const { id, files } = e.target;

        e.preventDefault();

        let reader = new FileReader();
        let imgFile = files[0];

        if (imgFile.size / (1024 * 1024) > 2) {
            this.setState({
                imgError: 'You have exceeded the maximum limit of 2 MB / per photo. Only JPEG photos are accepted.',
            });
        } else {
            this.setState({
                imgError: '',
            });

            reader.onloadend = () => {
                switch (id) {
                    case 'profileImgUploader':
                        this.setState({
                            profileImgFile: imgFile,
                            profilePreviewUrl: reader.result,
                            stepFinished3: true,
                        });
                        break;
                    case 'frontIdImgUploader':
                        this.setState({
                            frontImgFile: imgFile,
                            frontPreviewUrl: reader.result,
                            formFilled: true,
                        });
                        break;
                    case 'backIdImgUploader':
                        this.setState({
                            backImgFile: imgFile,
                            backPreviewUrl: reader.result,
                            formFilled: true,
                        });
                        break;
                    case 'passportImgUploader':
                        this.setState({
                            passportImgFile: imgFile,
                            passportPreviewUrl: reader.result,
                            formFilled: true,
                        });
                        break;
                    case 'investorDocUploader':
                        this.setState({
                            investorDocFile: imgFile,
                            investorDocPreviewUrl: reader.result,
                        });
                        break;
                    case 'driversLicenseImgUploader':
                        this.setState({
                            driversLicenseImgFile: imgFile,
                            driversLicensePreviewUrl: reader.result,
                            formFilled: true,
                        });
                    default:
                        break;
                }
            }

            reader.readAsDataURL(imgFile);
        }
    }

    onSubmitData = () => {
        if (this.props.verifying) return;
        const { verifyID, userId, userToken } = this.props;
        const { firstname, lastname, dob, country, phoneNo, cardType, profileImgFile, frontImgFile, backImgFile, passportImgFile, investorDocFile, driversLicenseImgFile } = this.state;

        verifyID({
            data: {
                firstname,
                lastname,
                dob,
                country,
                phoneNo,
                cardType,
                profileImgFile,
                frontImgFile,
                backImgFile,
                passportImgFile,
                driversLicenseImgFile,
                // investorDocFile,
            },
            userId: userId,
            token: userToken
        });
    }

    onOptionChange = (e) => {
        this.setState({
            cardType: e.target.value,
        });
    }

    onDoBChange = (jsDate, dateString) => {
        this.setState({
            dob: dateString,
        });
    }

    selectCountry = (val) => {
        this.setState({
            country: val,
            stepFinished1: true,
            stepFinished3: false,
            isUS: val === 'US',
        });
    }

    onPhoneChange = (val) => {
        this.setState({
            phoneNo: val,
        });
    }

    render () {
        const { getKycStatus, onInputChange, onUpload, onImgFileChange, onDoBChange, selectCountry, onPhoneChange, onSubmitData } = this;
        const { firstname, lastname, dob, country, phoneNo, cardType, profilePreviewUrl, frontPreviewUrl, backPreviewUrl, passportPreviewUrl, investorDocPreviewUrl, stepFinished1, isUS, stepFinished3, driversLicensePreviewUrl, formFilled, imgError } = this.state;
        const { crowdsaleInvestorStatusGetting, verifying, verifyingError, investorStatusData } = this.props;
        // const formFilled = (profilePreviewUrl !== '' && firstname !== '' && lastname !== '' && dob !== '' && country !== '' && phoneNo!== '');
        const stepFinished2 = (firstname !== '' && lastname !== '' && dob !== '' && country !== '' && phoneNo !== '');

        return (
            <div className='content-form content-wrapper'>
                <div className="row mb-4">
                    <div>
                        <h1>
                            KYC Verification Status:
                            <span className='verify-state'>{ getKycStatus() }</span>
                        </h1>
                        {
                            investorStatusData && investorStatusData.kycStatusFromShufti === 2 && investorStatusData.kycStatusFromContract !== 2 &&
                            <h6 className='mt-3 p-5 info-block'>It might take some minutes for your KYC status to be updated in the contract and you will get your Parsecs soon</h6>
                        }
                        {
                            investorStatusData && investorStatusData.kycStatusFromShufti === 3 &&
                            <h6 className='mt-3 p-5 info-block text-danger'>Try again with better photo or other document type</h6>
                        }
                        {
                            (verifyingError === '' || verifyingError === undefined || verifyingError === 'undefined' || verifyingError === null) ?
                            null
                            :
                            <h6 className='info-block text-danger mt-3 p-5'>
                                {verifyingError}
                            </h6>
                        }
                    </div>
                </div>
                {
                    !crowdsaleInvestorStatusGetting && investorStatusData && investorStatusData.kycStatusFromShufti === 0 &&
                    <div className='row d-flex'>
                        <div className='info-block full-width'>
                            <h6>Due to legal restrictions, we are obliged to verify the nationality (aka Know Your Customer process) of anyone that wants to buy PRSC through our ICO. The required information below will only be handled by the Parsec Frontiers team, and is treated as strictly confidential.</h6>
                        </div>
                    </div>
                }
                {
                    !crowdsaleInvestorStatusGetting && investorStatusData && investorStatusData.kycStatusFromShufti !== 2 &&
                    <div className='row kyc-content d-flex flex-column'>
                        <div className='row d-flex align-items-center justify-content-center fill'>
                            <div className='form-group row'>
                                <label className='col-md-3 col-sm-6 col-xs-12 kyc-param-label'>
                                    Country
                                </label>
                                <div className='col-md-3 col-sm-6 col-xs-12 country-selector pl-0 pr-0'>
                                    <CountryDropdown
                                        value={country}
                                        valueType='short'
                                        blacklist={['DZ', 'BD', 'BO', 'KH', 'CN', 'EC', 'KG', 'MA', 'NP']}
                                        onChange={(val) => selectCountry(val)}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            (stepFinished1 && isUS) &&
                            <div className='row d-flex align-items-left justify-content-start'>
                                <div className="col-md-12">
                                    <a
                                        href='https://docs.google.com/forms/d/e/1FAIpQLSc969Ds0cAI0Q4AzKJ-gKU4N56wt5bOlJhAY-iHQn2cAQUM9w/viewform'
                                        target='_blank'
                                        className='btn btn-primary'>
                                        Fill out KYC form manually
                                    </a>
                                </div>
                            </div>
                        }
                        {
                            (stepFinished1 && !isUS) &&
                            <div className='row d-flex align-items-center justify-content-center fill'>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-sm-6 col-xs-12 kyc-param-label'>
                                        First name
                                    </label>
                                    <input type='text' className='col-md-3 col-sm-6 col-xs-12 kyc-input' id='firstname' value={firstname} onChange={onInputChange} />
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-sm-6 col-xs-12 kyc-param-label'>
                                        Last name
                                    </label>
                                    <input type='text' className='col-md-3 col-sm-6 col-xs-12 kyc-input' id='lastname' value={lastname} onChange={onInputChange} />
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-sm-6 col-xs-12 kyc-param-label'>
                                        Date of birth
                                    </label>
                                    <div className='col-md-3 col-sm-6 col-xs-12 country-selector pl-0 pr-0'>
                                        <DatePickerInput
                                            displayFormat='YYYY-MM-DD'
                                            returnFormat='YYYY-MM-DD'
                                            valueLink={{
                                                value: dob,
                                                requestChange: dob => this.setState({ dob })
                                            }}
                                            showOnInputClick
                                            placeholder='placeholder'
                                            locale='no'
                                            onChange={onDoBChange}
                                            value={dob}
                                            className='date-picker'
                                        />
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <label className='col-md-3 col-sm-6 col-xs-12 kyc-param-label'>
                                        Phone number
                                    </label>
                                    <input type='number' className='col-md-3 col-sm-6 col-xs-12 kyc-input' id='phoneNo' value={phoneNo} onChange={onInputChange} />
                                    {/*<div className='col-md-4 col-sm-6 col-xs-12 country-selector pl-0 pr-0'>
                                        <ReactPhoneInput
                                            defaultCountry={country.toLowerCase()}
                                            excludeCountries={['dz', 'bd', 'bo', 'kh', 'cn', 'ec', 'kg', 'ma', 'np']}
                                            onChange={(val) => onPhoneChange(val)}
                                        />
                                    </div>*/}
                                </div>
                            </div>
                        }
                        <div className='form-group'>
                            <div className='col-md-12 col-sm-12 col-xs-12 upload-photo-section'>
                                {
                                    stepFinished2 &&
                                    <div className='row d-flex align-items-center justify-content-center full-width'>
                                        <div className='form-group row d-flex flex-column align-items-left justify-content-start mb-3'>
                                            <label className='mb-4 kyc-param-label'>Upload a color photo of yourself (Max size: 2mb, jpg only)</label>
                                            <div className=''>
                                                <img
                                                    className={`profile-image ${profilePreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                                    src={profilePreviewUrl ? profilePreviewUrl : avatarPlaceholder}
                                                />
                                                <a
                                                    className='upload-button btn btn-primary align-self-end p-1 ml-2'
                                                    id='profile'
                                                    onClick={onUpload}
                                                >
                                                    Upload
                                                </a>
                                            </div>
                                            {
                                                (imgError !== '') &&
                                                <label className='error'>{imgError}</label>
                                            }
                                            <input type='file' accept='.jpg, .jpeg' ref='profileImgUploader' id='profileImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='col-md-12 col-sm-12 col-xs-12 upload-photo-section'>
                            {
                                stepFinished3 &&
                                <div className='data-block'>
                                    <div className='row d-flex flex-column align-items-left justify-content-start mb-4'>
                                        <label className='kyc-param-label'>Select document type to identify</label>
                                        <div className=''>
                                            <div className='radio mr-2'>
                                                <label className='option-label kyc-doc-label'>
                                                    <input
                                                        type='radio'
                                                        value='passport'
                                                        checked={this.state.cardType === 'passport'}
                                                        onChange={this.onOptionChange}
                                                    />
                                                    <span>Passport</span>
                                                </label>
                                            </div>
                                            <div className='radio mr-2'>
                                                <label className='option-label kyc-doc-label'>
                                                    <input
                                                        type='radio'
                                                        value='id_card'
                                                        checked={this.state.cardType === 'id_card'}
                                                        onChange={this.onOptionChange}
                                                    />
                                                    ID Card
                                                </label>
                                            </div>
                                            <div className='radio'>
                                                <label className='option-label kyc-doc-label'>
                                                    <input
                                                        type='radio'
                                                        value='driving_license'
                                                        checked={this.state.cardType === 'driving_license'}
                                                        onChange={this.onOptionChange}
                                                    />
                                                    Driver's License
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        cardType === 'id_card' &&
                                        <div className='data-block'>
                                            <div className='row d-flex flex-column align-items-left justify-content-start'>
                                                <label className='kyc-param-label'>Upload photos of the front and back of your ID card (Max size: 2mb, jpg only)</label>
                                                <h6>(Government, school and/or university issued ID card)</h6>
                                            </div>
    
                                            <div className='row d-flex flex-row align-items-left justify-content-start mb-4'>
                                                <div className='no-col-md-12'>
                                                    <img
                                                        className={`id-image ${frontPreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                                        src={frontPreviewUrl ? frontPreviewUrl : cardPlaceholder}
                                                    />
                                                    <input type='file' accept='.jpg, .jpeg' ref='frontIdImgUploader' id='frontIdImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                                    <a
                                                        className='upload-button btn btn-primary p-1 mt-2 ml-2'
                                                        id='frontIdImg'
                                                        onClick={onUpload}
                                                    >
                                                        Upload front
                                                    </a>
                                                </div>
                                            </div>
    
                                            <div className='row d-flex flex-row align-items-left justify-content-start'>
                                                <div className='no-col-md-12'>
                                                    <img
                                                        className={`id-image ${backPreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                                        src={backPreviewUrl ? backPreviewUrl : cardPlaceholder}
                                                    />
                                                    <input type='file' accept='.jpg, .jpeg' ref='backIdImgUploader' id='backIdImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                                    <a
                                                        className='upload-button btn btn-primary p-1 mt-2 ml-2'
                                                        id='backIdImg'
                                                        onClick={onUpload}
                                                    >
                                                        Upload back
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        cardType === 'passport' &&
                                        <div className='data-block'>
                                            <div className='row d-flex flex-column align-items-left justify-content-start'>
                                                <label className='kyc-param-label'>Upload a photo of your passport (Max size: 2mb, jpg only)</label>
                                            </div>
    
                                            <div className='row d-flex flex-row align-items-left justify-content-start'>
                                                <div className='no-col-md-12'>
                                                    <img
                                                        className={`id-image ${passportPreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                                        src={passportPreviewUrl ? passportPreviewUrl : cardPlaceholder}
                                                    />
                                                    <input type='file' accept='.jpg, .jpeg' ref='passportImgUploader' id='passportImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                                    <a
                                                        className='upload-button btn btn-primary p-1 mt-2 ml-2'
                                                        id='passportImg'
                                                        onClick={onUpload}
                                                    >
                                                        Upload
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        cardType === 'driving_license' &&
                                        <div className='data-block'>
                                            <div className='row d-flex flex-column align-items-left justify-content-start'>
                                                <label className='kyc-param-label'>Upload a photo of your driver’s license (Max size: 2mb, jpg only)</label>
                                            </div>
    
                                            <div className='row d-flex flex-row align-items-left justify-content-start'>
                                                <div className='no-col-md-12'>
                                                    <img
                                                        className={`id-image ${driversLicensePreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                                        src={driversLicensePreviewUrl ? driversLicensePreviewUrl : cardPlaceholder}
                                                    />
                                                    <input type='file' accept='.jpg, .jpeg' ref='driversLicenseImgUploader' id='driversLicenseImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                                    <a
                                                        className='upload-button btn btn-primary p-1 mt-2 ml-2'
                                                        id='driversLicenseImg'
                                                        onClick={onUpload}
                                                    >
                                                        Upload
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/*
                                        country === 'US' &&
                                        <div className='row d-flex'>
                                            <div className='col-md-12 d-flex flex-column align-items-center justify-content-center'>
                                                <h6>Accredited investor document</h6>
                                                <img
                                                    className={`id-image ${investorDocPreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                                    src={investorDocPreviewUrl ? investorDocPreviewUrl : accreditedPlaceholder}
                                                />
                                                <input type='file' ref='investorDocUploader' id='investorDocUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                                <a
                                                    className='upload-button btn btn-primary p-1 mt-2'
                                                    id='investorDoc'
                                                    onClick={onUpload}
                                                >
                                                    Upload
                                                </a>
                                            </div>
                                        </div>
                                    */}
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                }
                {/*<div className='row mt-5 kyc-content'>
                    <div className='col-md-6 pr-5'>
                        <div className='form-group row d-flex align-items-center justify-content-center mb-3'>
                            <img
                                className={`profile-image ${profilePreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                src={profilePreviewUrl ? profilePreviewUrl : avatarPlaceholder}
                            />
                            <input type='file' ref='profileImgUploader' id='profileImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                            <a
                                className='upload-button btn btn-primary align-self-end p-1'
                                id='profile'
                                onClick={onUpload}
                            >
                                Upload
                            </a>
                        </div>
                        <div className='form-group row'>
                            <label className='col-md-4'>
                                Firstname
                            </label>
                            <input type='text' className='col-md-8' id='firstname' value={firstname} onChange={onInputChange} />
                        </div>
                        <div className='form-group row'>
                            <label className='col-md-4'>
                                Lastname
                            </label>
                            <input type='text' className='col-md-8' id='lastname' value={lastname} onChange={onInputChange} />
                        </div>
                        <div className='form-group row'>
                            <label className='col-md-4'>
                                Date of Birth
                            </label>
                            <DatePickerInput
                                displayFormat='YYYY-MM-DD'
                                returnFormat='YYYY-MM-DD'
                                valueLink={{
                                    value: dob,
                                    requestChange: dob => this.setState({ dob })
                                }}
                                showOnInputClick
                                placeholder='placeholder'
                                locale='no'
                                onChange={onDoBChange}
                                value={dob}
                                className='col-md-8 date-picker'
                            />
                        </div>
                        <div className='form-group row country-selector'>
                            <label className='col-md-4'>
                                Country
                            </label>
                            <CountryDropdown
                                value={country}
                                valueType='short'
                                onChange={(val) => selectCountry(val)}
                            />
                        </div>
                        <div className='form-group row'>
                            <label className='col-md-4'>
                                Phone Number
                            </label>
                            <ReactPhoneInput defaultCountry={country.toLowerCase()} onChange={(val) => onPhoneChange(val)} />
                        </div>
                    </div>
                    <div className={`col-md-6 data-block ${formFilled ? 'active' : 'inactive'}`}>
                        <div className='row d-flex flex-column align-items-center justify-content-center'>
                            <label>Be sure to complete the left form to upload ID card.</label>
                            <h6>Card Type</h6>
                            <div className='row'>
                                <div className='radio mr-5'>
                                    <label className='option-label'>
                                        <input
                                            type='radio'
                                            value='passport'
                                            checked={this.state.cardType === 'passport'}
                                            onChange={this.onOptionChange}
                                        />
                                        Passport
                                    </label>
                                </div>
                                <div className='radio'>
                                    <label className='option-label'>
                                        <input
                                            type='radio'
                                            value='id_card'
                                            checked={this.state.cardType === 'id_card'}
                                            onChange={this.onOptionChange}
                                        />
                                        ID Card
                                    </label>
                                </div>
                            </div>
                        </div>
                        {
                            cardType === 'id_card' &&
                            <div className='row d-flex'>
                                <div className='col-md-6 d-flex flex-column align-items-center justify-content-center'>
                                    <h6>Front Photo</h6>
                                    <img
                                        className={`id-image ${frontPreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                        src={frontPreviewUrl ? frontPreviewUrl : cardPlaceholder}
                                    />
                                    <input type='file' ref='frontIdImgUploader' id='frontIdImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                    <a
                                        className='upload-button btn btn-primary p-1 mt-2'
                                        id='frontIdImg'
                                        onClick={onUpload}
                                    >
                                        Upload
                                    </a>
                                </div>
                                <div className='col-md-6 d-flex flex-column align-items-center justify-content-center'>
                                    <h6>Back Photo</h6>
                                    <img
                                        className={`id-image ${backPreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                        src={backPreviewUrl ? backPreviewUrl : cardPlaceholder}
                                    />
                                    <input type='file' ref='backIdImgUploader' id='backIdImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                    <a
                                        className='upload-button btn btn-primary p-1 mt-2'
                                        id='backIdImg'
                                        onClick={onUpload}
                                    >
                                        Upload
                                    </a>
                                </div>
                            </div>
                        }
                        {
                            cardType === 'passport' &&
                            <div className='row d-flex'>
                                <div className='col-md-12 d-flex flex-column align-items-center justify-content-center'>
                                    <h6>Passport</h6>
                                    <img
                                        className={`id-image ${passportPreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                        src={passportPreviewUrl ? passportPreviewUrl : cardPlaceholder}
                                    />
                                    <input type='file' ref='passportImgUploader' id='passportImgUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                    <a
                                        className='upload-button btn btn-primary p-1 mt-2'
                                        id='passportImg'
                                        onClick={onUpload}
                                    >
                                        Upload
                                    </a>
                                </div>
                            </div>
                        }
                        {
                            country === 'US' &&
                            <div className='row d-flex'>
                                <div className='col-md-12 d-flex flex-column align-items-center justify-content-center'>
                                    <h6>Accredited investor document</h6>
                                    <img
                                        className={`id-image ${investorDocPreviewUrl ? 'image-filled' : 'image-unfilled'}`}
                                        src={investorDocPreviewUrl ? investorDocPreviewUrl : accreditedPlaceholder}
                                    />
                                    <input type='file' ref='investorDocUploader' id='investorDocUploader' style={{ display: 'none' }} onChange={onImgFileChange} />
                                    <a
                                        className='upload-button btn btn-primary p-1 mt-2'
                                        id='investorDoc'
                                        onClick={onUpload}
                                    >
                                        Upload
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
                </div>*/}
                {/*<div className='row d-flex align-items-center justify-content-start mt-4'>
                    <button className='btn btn-primary' onClick={onSubmitData}>
                        Submit documents
                    </button>
                </div>*/}
                {
                    !crowdsaleInvestorStatusGetting && investorStatusData && investorStatusData.kycStatusFromShufti !== 2 && formFilled &&
                    <div className='mt-4 col-md-6 col-sm-12 col-xs-12 p-0'>
                        <div className="d-flex align-items-right justify-content-end">
                            <button
                                className='btn btn-primary'
                                onClick={onSubmitData}>
                                {
                                    verifying &&
                                    <i className="fa fa-spinner fa-spin mr-2"></i>
                                }
                                <span>Verify me</span>
                            </button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

KycInfoView.propTypes = {
    userId: PropTypes.string,
    userToken: PropTypes.string,
    verifying: PropTypes.bool,
    verifyingError: PropTypes.string,
    verifiedMessage: PropTypes.string,
    investorStatusData: PropTypes.object,
    verifyID: PropTypes.func,
    crowdsaleInvestorStatusGetting: PropTypes.bool,
    getCrowdsaleInvestorStatus: PropTypes.func,
    resetStatus: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        verifying: state.kycReducer.verifying,
        verifyingError: state.kycReducer.verifyingError,
        verifiedMessage: state.kycReducer.verifiedMessage,
        crowdsaleInvestorStatusGetting: state.crowdsaleReducer.crowdsaleInvestorStatusGetting,
        investorStatusData: state.crowdsaleReducer.investorStatusData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyID: (req) => dispatch(KycActions.verifyID(req.data, req.userId, req.token)),
        resetStatus: () => dispatch(KycActions.resetStatus()),
        getCrowdsaleInvestorStatus: (req) => dispatch(CrowdsaleActions.getCrowdsaleInvestorStatus(req.userId, req.token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KycInfoView);

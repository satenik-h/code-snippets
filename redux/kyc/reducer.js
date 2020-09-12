import {Map} from 'immutable';

import * as actionTypes from '../../constants/ActionTypes';

const initialState = new Map({
    documentUploadingResult: null,
    documentUploading: false,
    documentUploadingError: null,

    documentDeletingResult: null,
    documentDeleting: false,
    documentDeletingError: null,

    formSubmitting: false,
    formResult: null,
    formError: null,
    currentTitle: '',
    status: 'none',
    notificationDescription: '',
    notificationFor: '',
    notificationButton: '',
    notification: '',

    IDstatus: '',
    POAstatus: '',
    FACEurl: '',
    IDurl: '',
    POAurl: '',
    comment: '',
    existingDataID: {},
    existingDataPOA: {},

    verificationChecking: false,
    verificationResult: null,
    verificationError: null,

    poaLoaded: false,
    idLoaded: false,

    getDocuments: false,
    getDocumentsResult: null,
    getDocumentsError: null,

    verifying: false,
    verifyingError: null,
    verifedMessage: null
});

function kycReducer(state = initialState, action) {
    if (!action)
        return state;

    switch (action.type) {
        case actionTypes.VERIFY_ID: {
            return Object.assign({}, state, {
                verifying: true,
                verifyingError: null,
            });
        }

        case actionTypes.VERIFY_ID_SUCCESS: {
            return Object.assign({}, state, {
                verifedMessage: action.data,
                verifying: false,
                verifyingError: null,
            });
        }

        case actionTypes.VERIFY_ID_FAILURE: {
            return Object.assign({
                verifying: false,
                verifyingError: action.errorMsg,
            });
        }

        case actionTypes.RESET: {
            return Object.assign({
                verifying: false,
            });
        }

        case actionTypes.UPLOAD_DOCUMENT: {
            return Object.assign({}, state, {
                documentUploading: true,
            });
        }

        case actionTypes.UPLOAD_DOCUMENT_SUCCESS: {
            return Object.assign({}, state, {
                existingDataID: action.docType === "ID" ? {
                    firstName: action.data.extractedData && action.data.extractedData.Forename,
                    lastName: action.data.extractedData && action.data.extractedData.Surname,
                    DOB: action.data.extractedData && action.data.extractedData.DOB,
                    nationality: action.data.extractedData && action.data.extractedData.Nationality,
                    gender: action.data.extractedData && action.data.extractedData.Gender,
                } : state.existingDataID,
                documentUploading: false,
                documentUploadingError: null,
                FACEurl: action.docType === "FACE" ? action.data.url : state.FACEurl,
                IDurl: action.docType === "ID" ? action.data.url : state.IDurl,
                POAurl: action.docType === "POA" ? action.data.url : state.POAurl,
                idLoaded: state.idLoaded || action.docType === "ID",
                poaLoaded: state.poaLoaded || action.docType === "POA"
            });
        }

        case actionTypes.UPLOAD_DOCUMENT_ERROR: {
            return Object.assign({}, state, {
                supportedCurrenciesLoading: false,
                documentUploading: false,
                documentUploadingError: action.errorMsg,
            });
        }

        case actionTypes.UPLOAD_DOCUMENT_CLEAR_ERROR: {
            return Object.assign({}, state, {
                documentUploading: false,
                documentUploadingError: null,
            });
        }

        case actionTypes.DELETE_DOCUMENT: {
            return Object.assign({}, state, {
                documentDeleting: true,
            });
        }

        case actionTypes.DELETE_DOCUMENT_SUCCESS: {
            return Object.assign({}, state, {
                documentDeletingResult: action.data,
                documentDeleting: false,
                documentDeletingError: null,
            });
        }

        case actionTypes.DELETE_DOCUMENT_ERROR: {
            return Object.assign({}, state, {
                documentDeleting: false,
                documentDeletingError: action.errorMsg,
            });
        }

        case actionTypes.GET_KYC_TITLE: {
            return Object.assign({}, state, {
                currentTitle: action.name,
            });
        }

        case actionTypes.SEND_KYC_DATA: {
            return Object.assign({}, state, {
                formSubmitting: true,
            });
        }

        case actionTypes.SEND_KYC_DATA_SUCCESS: {
            return Object.assign({}, state, {
                status: "pending",
                formSubmitting: false,
                formError: null,
            });
        }

        case actionTypes.SEND_KYC_DATA_ERROR: {
            return Object.assign({}, state, {
                formError: action.errorMsg,
            });
        }

        case actionTypes.CHANGE_KYC_NOTIFICATION: {
            return Object.assign({}, state, {
                status: action.notification.status,
                notification: action.notification.message,
                notificationDescription: action.notification.description,
                notificationFor: action.notification.for,
                notificationButton: action.notification.button,
            });
        }

        case actionTypes.VERIFICATION_CHECKING: {
            return Object.assign({}, state, {
                verificationChecking: true,
            });
        }

        case actionTypes.VERIFICATION_CHECKING_SUCCESS: {
            if (action.data &&
                action.data.ID && action.data.ID.outcome &&
                action.data.POA && action.data.POA.outcome) {
                if (action.data.ID.outcome === "OK" && action.data.POA.outcome === "OK")
                    status = 'success';
                else if (action.data.ID.outcome === "PENDING" && action.data.POA.outcome === "PENDING")
                    status = 'pending';
                else
                    status = 'failure';

                return Object.assign({}, state, {
                    verificationChecking: false,
                    status,
                    poaLoaded: true,
                    IDstatus: action.data.ID.outcome,
                    POAstatus: action.data.POA.outcome,
                    existingDataID: action.data.ID.providedData,
                    existingDataPOA: action.data.POA.providedData,
                    FACEurl: action.data.FACE.url,
                    IDurl: action.data.ID.url,
                    POAurl: action.data.POA.url,
                    poaLoaded: true,
                    idLoaded: true,
                    comment: action.data.comment,
                    verificationError: null,
                });
            }

            return Object.assign({}, state, {
                verificationChecking: false,
                poaLoaded: false,
                status: 'none',
                verificationError: null,
                IDstatus: null,
                POAstatus: null,
                existingDataID: null,
                existingDataPOA: null,
                FACEurl: null,
                IDurl: null,
                POAurl: null,
                poaLoaded: false,
                idLoaded: false,
                comment: null,
            });
        }

        case actionTypes.VERIFICATION_CHECKING_ERROR: {
            return Object.assign({}, state, {
                verificationChecking: false,
                verificationResult: null,
                verificationError: action.errorMsg,
            });
        }

        case actionTypes.GET_DOCUMENTS: {
            return Object.assign({}, state, {
                getDocuments: true,
            });
        }

        case actionTypes.GET_DOCUMENTS_SUCCESS: {
            return Object.assign({}, state, {
                getDocuments: false,
                getDocumentsResult: action.data,
                getDocumentsError: null,
            });
        }

        case actionTypes.GET_DOCUMENTS_ERROR: {
            return Object.assign({}, state, {
                getDocuments: false,
                getDocumentsResult: null,
                getDocumentsError: action.errorMsg,
            });
        }

        default: {
            return state;
        }
    }
}

export default kycReducer;

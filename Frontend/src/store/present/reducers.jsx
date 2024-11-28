import { DOWNLOAD_PRESENTS, DOWNLOAD_PRESENTS_FAILED, DOWNLOAD_PRESENTS_SUCCESS, GENERATE_BARCODE, GENERATE_BARCODE_FAILED, GENERATE_BARCODE_SUCCESS, GET_PRESENT, GET_PRESENT_FAILED, GET_PRESENT_SUCCESS, SCAN_BARCODE, SCAN_BARCODE_FAILED, SCAN_BARCODE_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
    presents: [],
    scan: {
        message: null
    },
    download: {
        message: null
    }
}

const presentReducer = (state = init_state, action) => {
    switch (action.type) {
        case GENERATE_BARCODE:
            state = {
                ...state,
                loading: true
            }
            break
        case GENERATE_BARCODE_SUCCESS:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case GENERATE_BARCODE_FAILED:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case SCAN_BARCODE:
            state = {
                ...state,
                loading: true
            }
            break
        case SCAN_BARCODE_SUCCESS:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case SCAN_BARCODE_FAILED:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case GET_PRESENT:
            state = {
                ...state,
                loading: true
            }
            break
        case GET_PRESENT_SUCCESS:
            state = {
                ...state,
                loading: false,
                presents: action.payload
            }
            break
        case GET_PRESENT_FAILED:
            state = {
                ...state,
                loading: false,
                presents: action.payload
            }
            break
        case DOWNLOAD_PRESENTS:
            state = {
                ...state,
                loading: true,
                download: {
                    message: null
                }
            }
            break;
        case DOWNLOAD_PRESENTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                download: {
                    message: action.payload
                }
            }
            break;
        case DOWNLOAD_PRESENTS_FAILED:
            state = {
                ...state,
                loading: false,
                download: {
                    message: action.payload
                }
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}

export default presentReducer
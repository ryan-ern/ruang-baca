import { DOWNLOAD, DOWNLOAD_FAILED, DOWNLOAD_SUCCESS, GET_RETURN, GET_RETURN_ADMIN, GET_RETURN_ADMIN_FAILED, GET_RETURN_ADMIN_SUCCESS, GET_RETURN_FAILED, GET_RETURN_SUCCESS, POST_ACCEPT_RETURN, POST_ACCEPT_RETURN_FAILED, POST_ACCEPT_RETURN_SUCCESS, POST_RESET_RETURN, POST_RESET_RETURN_FAILED, POST_RESET_RETURN_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
    reset: [],
    download: {
        loading: false,
        message: null
    }
}

const returnReducer = (state = init_state, action) => {
    switch (action.type) {
        case GET_RETURN_ADMIN:
            state = {
                ...state,
                loading: true,
            }
            break
        case GET_RETURN_ADMIN_SUCCESS:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case GET_RETURN_ADMIN_FAILED:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case GET_RETURN:
            state = {
                ...state,
                loading: true,
            }
            break
        case GET_RETURN_SUCCESS:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case GET_RETURN_FAILED:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case POST_ACCEPT_RETURN:
            state = {
                ...state,
                loading: true
            }
            break
        case POST_ACCEPT_RETURN_SUCCESS:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case POST_ACCEPT_RETURN_FAILED:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case POST_RESET_RETURN:
            state = {
                ...state,
                loading: true
            }
            break
        case POST_RESET_RETURN_SUCCESS:
            state = {
                ...state,
                loading: false,
                reset: action.payload
            }
            break
        case POST_RESET_RETURN_FAILED:
            state = {
                ...state,
                loading: false,
                reset: action.payload
            }
            break
        case DOWNLOAD:
            state = {
                ...state,
                loading: true,
                download: { message: null }
            }
            break
        case DOWNLOAD_SUCCESS:
            state = {
                ...state,
                loading: false,
                download: { message: action.payload }
            }
            break
        case DOWNLOAD_FAILED:
            state = {
                ...state,
                loading: false,
                download: { message: action.payload },
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}

export default returnReducer
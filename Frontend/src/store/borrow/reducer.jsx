import { CLEAR_BORROW_MESSAGE, DELETE_BORROW, DELETE_BORROW_SUCCESS, DOWNLOAD_BORROW, DOWNLOAD_BORROW_FAILED, DOWNLOAD_BORROW_SUCCESS, GET_BORROW, GET_BORROW_ADMIN, GET_BORROW_ADMIN_FAILED, GET_BORROW_ADMIN_SUCCESS, GET_BORROW_FAILED, GET_BORROW_SUCCESS, POST_ACCEPT_BORROW, POST_ACCEPT_BORROW_FAILED, POST_ACCEPT_BORROW_SUCCESS, POST_BORROW, POST_BORROW_FAILED, POST_BORROW_SUCCESS, POST_DENIED_BORROW, POST_DENIED_BORROW_FAILED, POST_DENIED_BORROW_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
    add: {
        loading: false,
        message: null
    },
    accept: {
        loading: false,
        message: null
    },
    denied: {
        loading: false,
        message: null,
    },
    delete: {
        loading: false,
        message: null,
    },
    download: {
        loading: false,
        message: null
    }
}

const borrowReducer = (state = init_state, action) => {
    switch (action.type) {
        case GET_BORROW:
            state = {
                ...state,
                loading: true
            }
            break
        case GET_BORROW_SUCCESS:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case GET_BORROW_FAILED:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case GET_BORROW_ADMIN:
            state = {
                ...state,
                loading: true,
            }
            break
        case GET_BORROW_ADMIN_SUCCESS:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case GET_BORROW_ADMIN_FAILED:
            state = {
                ...state,
                loading: false,
                response: action.payload
            }
            break
        case POST_BORROW:
            state = {
                ...state,
                loading: true,
                add: { message: null },
                accept: { message: null },
                denied: { message: null },
                delete: { message: null },
            }
            break
        case POST_BORROW_SUCCESS:
            state = {
                ...state,
                loading: false,
                add: { message: action.payload }
            }
            break
        case POST_BORROW_FAILED:
            state = {
                ...state,
                loading: false,
                add: { message: action.payload }
            }
            break
        case POST_ACCEPT_BORROW:
            state = {
                ...state,
                loading: true,
                add: { message: null },
                accept: { message: null },
                denied: { message: null },
                delete: { message: null },
            }
            break
        case POST_ACCEPT_BORROW_SUCCESS:
            state = {
                ...state,
                loading: false,
                accept: { message: action.payload },
            }
            break
        case POST_ACCEPT_BORROW_FAILED:
            state = {
                ...state,
                loading: false,
                accept: { message: action.payload },
            }
            break
        case POST_DENIED_BORROW:
            state = {
                ...state,
                loading: true,
                add: { message: null },
                accept: { message: null },
                denied: { message: null },
                delete: { message: null },
            }
            break
        case POST_DENIED_BORROW_SUCCESS:
            state = {
                ...state,
                loading: false,
                denied: { message: action.payload }
            }
            break
        case POST_DENIED_BORROW_FAILED:
            state = {
                ...state,
                loading: false,
                denied: { message: action.payload }
            }
            break
        case DELETE_BORROW:
            state = {
                ...state,
                loading: true,
                add: { message: null },
                accept: { message: null },
                denied: { message: null },
                delete: { message: null },
            }
            break
        case DELETE_BORROW_SUCCESS:
            state = {
                ...state,
                loading: false,
                delete: { message: action.payload }
            }
            break
        case CLEAR_BORROW_MESSAGE:
            state = {
                ...state,
                loading: false,
                add: { message: null },
                accept: { message: null },
                denied: { message: null },
                delete: { message: null },
            }
            break
        case DOWNLOAD_BORROW:
            state = {
                ...state,
                loading: true,
                download: { message: null }
            }
            break
        case DOWNLOAD_BORROW_SUCCESS:
            state = {
                ...state,
                loading: false,
                download: { message: action.payload }
            }
            break
        case DOWNLOAD_BORROW_FAILED:
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

export default borrowReducer
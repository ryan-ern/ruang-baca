import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT, LOGOUT_SUCCESS, REGISTER, REGISTER_SUCCESS, REGISTER_FAILED, AUTH_INFO, AUTH_INFO_SUCCESS, AUTH_INFO_FAILED
} from './actionTypes'

const init_state = {
    check: false,
    response: {
    },
    message: null,
    isLogin: false,
    loading: false,
}

const authReducer = (state = init_state, action) => {
    switch (action.type) {
    case REGISTER:
        state = {
            ...state,
            loading: true,
        }
        break;
    case REGISTER_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload,
        }
        break;
    case REGISTER_FAILED:
        state = {
            ...state,
            loading: false,
            response: action.payload,
        }
        break;
    case LOGIN:
        state = {
            ...state,
            loading: true,
        }
        break;
    case LOGIN_SUCCESS:
        state = {
            ...state,
            loading: false,
            isLogin: true,
            response: action.payload,
        }
        break;
    case LOGIN_FAILED:
        state = {
            ...state,
            loading: false,
            isLogin: false,
            message: action.payload,
        }
        break;
    case AUTH_INFO:
        state = {
            ...state
        }
        break;
    case AUTH_INFO_SUCCESS:
        state = {
            ...state,
            check: true,
            isLogin: true,
            response: action.payload
        }
        break;
    case AUTH_INFO_FAILED:
        state = { ...init_state };
        state = {
            ...state,
            check: true,
            isLogin: false,
        }
        break;
    case LOGOUT:
        break;
    case LOGOUT_SUCCESS:
        state = { ...init_state };
        state = {
            ...state,
            check: true,
        }
        break;
    default:
        state = { ...state };
        break;
    }
    return state;
}
export default authReducer
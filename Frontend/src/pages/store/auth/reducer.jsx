import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT, LOGOUT_SUCCESS, REGISTER, REGISTER_SUCCESS, REGISTER_FAILED
} from './actionTypes'

const init_state = {
    response: {
        message: ''
    },
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
            response: action.payload,
        }
        break;
    case LOGOUT:
        break;
    case LOGOUT_SUCCESS:
        state = { ...init_state };
        state = {
            ...state
        }
        break;
    default:
        state = { ...state };
        break;
    }
    return state;
}
export default authReducer
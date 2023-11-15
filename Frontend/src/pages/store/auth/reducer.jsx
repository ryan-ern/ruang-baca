import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT, LOGOUT_SUCCESS
} from './actionTypes'

const init_state = {
    message: '',
    response: {
        message: ''
    },
    isLogin: false,
    loading: false,
}

const AuthReducer = (state = init_state, action) => {
    switch (action.type) {
    case LOGIN:
        state = {
            ...state,
            loading: true,
            message: '',
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
            isLogin: true,
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
export default AuthReducer
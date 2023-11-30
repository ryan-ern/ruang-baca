import { GET_RETURN, GET_RETURN_ADMIN, GET_RETURN_ADMIN_FAILED, GET_RETURN_ADMIN_SUCCESS, GET_RETURN_FAILED, GET_RETURN_SUCCESS, POST_ACCEPT_RETURN, POST_ACCEPT_RETURN_FAILED, POST_ACCEPT_RETURN_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
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
        state ={
            ...state,
            loading: true
        }
        break
    case POST_ACCEPT_RETURN_SUCCESS:
        state ={
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case POST_ACCEPT_RETURN_FAILED:
        state ={
            ...state,
            loading: false,
            response: action.payload
        }
        break
    default:
        state = { ...state }
        break
    }
    return state
}

export default returnReducer
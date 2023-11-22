import { DELETE_ACCOUNT, DELETE_ACCOUNT_SUCCESS, EDIT_ACCOUNT, EDIT_ACCOUNT_FAILED, EDIT_ACCOUNT_SUCCESS, GET_ACCOUNT, GET_ACCOUNT_FAILED, GET_ACCOUNT_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: {},
    delete: { message: null },
    edit: {message:null}
}

const accountReducer = (state = init_state, action) => {
    switch (action.type) {
    case GET_ACCOUNT:
        state = {
            ...state,
            loading: true,
        }
        break
    case GET_ACCOUNT_SUCCESS:
        state = {
            ...state,
            response: action.payload
        }
        break
    case GET_ACCOUNT_FAILED:
        state = {
            ...state,
            response: action.payload
        }
        break
    case DELETE_ACCOUNT:
        state = {
            ...state,
            edit: { message: null },
            delete: { message: null },
        }
        break
    case DELETE_ACCOUNT_SUCCESS:
        state = {
            ...state,
            delete: { message: action.payload },
        }
        break
    case EDIT_ACCOUNT:
        state = {
            ...state,
            edit: { message: null },
            delete: { message: null },
            loading:true,
        }
        break
    case EDIT_ACCOUNT_SUCCESS:
        state = {
            ...state,
            loading: false,
            edit: {message:action.payload}
        }
        break
    case EDIT_ACCOUNT_FAILED:
        state = {
            ...state,
            loading:false,
        }
        break
    default:
        state= {...state }
        break
    }
    return state
}
export default accountReducer
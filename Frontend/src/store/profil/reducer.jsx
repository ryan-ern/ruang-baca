import { PUT_PROFILE, PUT_PROFILE_FAILED, PUT_PROFILE_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    message: null,
}

const profilReducer = (state = init_state, action) => {
    switch (action.type) {
    case PUT_PROFILE:
        state = {
            ...state,
            loading: true,
        }
        break
    case PUT_PROFILE_SUCCESS:
        state = {
            ...state,
            loading: false,
            message: action.payload.data,
        }
        break
    case PUT_PROFILE_FAILED:
        state = {
            ...state,
            loading: false,
            message: action.payload,
        }
        break
    default:
        state = { ...state }
        break
    }
    return state
}

export default profilReducer
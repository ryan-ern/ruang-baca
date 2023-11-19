import { PUT_PROFILE, PUT_PROFILE_FAILED, PUT_PROFILE_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: {},
}

const profilReducer = (state = init_state, action) => {
    switch (action.type) {
    case PUT_PROFILE:
        state = {
            ...state,
            loading: true
        }
        break
    case PUT_PROFILE_SUCCESS:
        state = {
            ...state,
            loading: false,
        }
        break
    case PUT_PROFILE_FAILED:
        state = {
            ...state,
            response: action.payload.message,
        }
        break
    default:
        state = { ...state }
        break
    }
    return state
}

export default profilReducer
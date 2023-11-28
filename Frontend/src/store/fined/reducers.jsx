import { GET_FINED, GET_FINED_FAILED, GET_FINED_SUCCES } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
    message: null
}

const finedReducer = (state = init_state, action) => {
    switch (action.type) {
    case GET_FINED:
        state={
            ...state,
            loading:true
        }
        break
    case GET_FINED_SUCCES:
        state={
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case GET_FINED_FAILED:
        state={
            ...state,
            loading: false,
            message : action.payload
        }
        break
    default:
        state = { ...state }
        break
    }
    return state
}

export default finedReducer
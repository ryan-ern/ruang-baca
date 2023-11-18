import { GET_INVENTORY, GET_INVENTORY_FAILED, GET_INVENTORY_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
}

const inventoryReducer = (state = init_state, action) =>{
    switch (action.type) {
    case GET_INVENTORY:
        state = {
            ...state,
            loading: true
        }
        break
    case GET_INVENTORY_SUCCESS:
        state = {
            ...state,
            loading: false,
            response: action.payload
        }
        break
    case GET_INVENTORY_FAILED:
        state = {
            ...state,
            loading: false,
            response:action.payload,
        }
        break
    default:
        state = { ...state }
        break
    }
    return state
}

export default inventoryReducer
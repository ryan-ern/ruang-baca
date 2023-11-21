import { EDIT_INVENTORY, EDIT_INVENTORY_FAILED, EDIT_INVENTORY_SUCCESS, GET_INVENTORY, GET_INVENTORY_FAILED, GET_INVENTORY_SUCCESS, POST_INVENTORY, POST_INVENTORY_FAILED, POST_INVENTORY_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: [],
    create: {
        loading:false,
        message: ''
    },
    edit: {
        loading:false,
        message: ''
    },
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
    case POST_INVENTORY:
        state = {
            ...state,
            loading:true,
            create: {message:''}
        }
        break
    case POST_INVENTORY_SUCCESS:
        state = {
            ...state,
            loading:false,
            create: {message:''}
        }
        break
    case POST_INVENTORY_FAILED:
        state = {
            ...state,
            loading:false,
            create: {message:action.payload.message},
        }
        break
    case EDIT_INVENTORY:
        state = {
            ...state,
            loading:true,
            edit: {message:''}
        }
        break
    case EDIT_INVENTORY_SUCCESS:
        state = {
            ...state,
            loading:false,
            edit: {message:''}
        }
        break
    case EDIT_INVENTORY_FAILED:
        state = {
            ...state,
            loading:false,
            edit: {message:action.payload.message},
        }
        break
    default:
        state = { ...state }
        break
    }
    return state
}

export default inventoryReducer
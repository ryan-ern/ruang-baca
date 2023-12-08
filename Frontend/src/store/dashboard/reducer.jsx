import { GET_DASHBOARD, GET_DASHBOARD_FAILED, GET_DASHBOARD_SUCCESS, GET_WHATSAPP, GET_WHATSAPP_SUCCESS } from "./actionTypes"

const init_state = {
    loading: false,
    response: {},
    whatsapp: []
}

const dashboardReducer = (state = init_state, action) => {
    switch (action.type) {
    case GET_DASHBOARD:
        state = {
            ...state,
            loading:true,
        }
        break
    case GET_DASHBOARD_SUCCESS:
        state = {
            ...state,
            loading: false,
            response:action.payload,
        }
        break
    case GET_DASHBOARD_FAILED:
        state = {
            ...state,
            loading: false,
            response:action.payload,
        }
        break
    case GET_WHATSAPP:
        state = {
            ...state,
            loading:true,
        }
        break
    case GET_WHATSAPP_SUCCESS:
        state = {
            ...state,
            loading: false,
            whatsapp:action.payload,
        }
        break
    default:
        state = { ...state }
        break;
    }
    return state;
}
export default dashboardReducer
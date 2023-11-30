import { GET_RETURN, GET_RETURN_ADMIN, GET_RETURN_ADMIN_FAILED, GET_RETURN_ADMIN_SUCCESS, GET_RETURN_FAILED, GET_RETURN_SUCCESS, POST_ACCEPT_RETURN, POST_ACCEPT_RETURN_FAILED, POST_ACCEPT_RETURN_SUCCESS } from "./actionTypes";

export const returnAdmin = () => ({
    type: GET_RETURN_ADMIN,
    payload: null,
})
export const returnAdminSuccess = (respons) => ({
    type: GET_RETURN_ADMIN_SUCCESS,
    payload: respons,
})
export const returnAdminFailed = (message) => ({
    type: GET_RETURN_ADMIN_FAILED,
    payload: message,
})
export const returnUser = () => ({
    type: GET_RETURN,
    payload: null,
})
export const returnUserSuccess = (respons) => ({
    type: GET_RETURN_SUCCESS,
    payload: respons,
})
export const returnUserFailed = (message) => ({
    type: GET_RETURN_FAILED,
    payload: message,
})

export const postReturn = (id) => ({
    type: POST_ACCEPT_RETURN,
    payload: {id}
    
})
export const postReturnSuccess = (respons) => ({
    type: POST_ACCEPT_RETURN_SUCCESS,
    payload: respons
    
})
export const postReturnFailed = (message) => ({
    type: POST_ACCEPT_RETURN_FAILED,
    payload: message
})
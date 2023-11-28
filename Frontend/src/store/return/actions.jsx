import { GET_RETURN_ADMIN, GET_RETURN_ADMIN_FAILED, GET_RETURN_ADMIN_SUCCESS } from "./actionTypes";

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
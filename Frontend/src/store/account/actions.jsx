import { CLEAR_ACCOUNT_MESSAGE, DELETE_ACCOUNT, DELETE_ACCOUNT_SUCCESS, EDIT_ACCOUNT, EDIT_ACCOUNT_FAILED, EDIT_ACCOUNT_SUCCESS, GET_ACCOUNT, GET_ACCOUNT_SUCCESS, POST_ACCOUNT_ADMIN, POST_ACCOUNT_ADMIN_FAILED, POST_ACCOUNT_ADMIN_SUCCESS, POST_ACCOUNT_SUPER, POST_ACCOUNT_SUPER_FAILED, POST_ACCOUNT_SUPER_SUCCESS } from "./actionTypes";

export const account = () => ({
    type: GET_ACCOUNT,
    payload: null,
})
export const accountSuccess = (respons) => ({
    type: GET_ACCOUNT_SUCCESS,
    payload: respons,
})
export const accountFailed = (message) => ({
    type: GET_ACCOUNT,
    payload: message,
})


export const deleteAccount = (username, onHide) => ({
    type: DELETE_ACCOUNT,
    payload: {username, onHide}
})
export const deleteAccountSuccess = (message) => ({
    type: DELETE_ACCOUNT_SUCCESS,
    payload: message,
})


export const editAccount = (username, data, onHide) => ({
    type: EDIT_ACCOUNT,
    payload: {username, data, onHide},
})
export const editAccountSuccess = (message) => ({
    type: EDIT_ACCOUNT_SUCCESS,
    payload: message,
})
export const editAccountFailed = (message) => ({
    type: EDIT_ACCOUNT_FAILED,
    payload: message,
})


export const clearAccountMessage = () => ({
    type: CLEAR_ACCOUNT_MESSAGE,
    payload: null,
})


export const postAccountAdmin = (data, onHide) => ({
    type: POST_ACCOUNT_ADMIN,
    payload: {data, onHide}
})
export const postAccountAdminSuccess = (message) => ({
    type: POST_ACCOUNT_ADMIN_SUCCESS,
    payload: message
})
export const postAccountAdminFailed = (message) => ({
    type: POST_ACCOUNT_ADMIN_FAILED,
    payload: message
})


export const postAccountSuper = (data, onHide) => ({
    type: POST_ACCOUNT_SUPER,
    payload: {data, onHide}
})
export const postAccountSuperSuccess = (message) => ({
    type: POST_ACCOUNT_SUPER_SUCCESS,
    payload: message
})
export const postAccountSuperFailed = (message) => ({
    type: POST_ACCOUNT_SUPER_FAILED,
    payload: message
})
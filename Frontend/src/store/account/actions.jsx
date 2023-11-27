import { CLEAR_ACCOUNT_MESSAGE, DELETE_ACCOUNT, DELETE_ACCOUNT_SUCCESS, EDIT_ACCOUNT, EDIT_ACCOUNT_FAILED, EDIT_ACCOUNT_SUCCESS, GET_ACCOUNT, GET_ACCOUNT_SUCCESS } from "./actionTypes";

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
export const deleteAccount = (username) => ({
    type: DELETE_ACCOUNT,
    payload: username,
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

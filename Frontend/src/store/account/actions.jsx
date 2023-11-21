import { DELETE_ACCOUNT, EDIT_ACCOUNT, EDIT_ACCOUNT_FAILED, EDIT_ACCOUNT_SUCCESS, GET_ACCOUNT, GET_ACCOUNT_SUCCESS } from "./actionTypes";

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
export const editAccount = (username, data, onHide) => ({
    type: EDIT_ACCOUNT,
    payload: {username, data, onHide},
})
export const editAccountSuccess = () => ({
    type: EDIT_ACCOUNT_SUCCESS,
    payload: null,
})
export const editAccountFailed = (message) => ({
    type: EDIT_ACCOUNT_FAILED,
    payload: message,
})
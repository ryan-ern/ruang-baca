import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT, LOGOUT_SUCCESS
} from "./actionTypes";

/**
 * Login
 */

export const login = (account, navigate) => ({
    type: LOGIN,
    payload: {account,navigate}
})

export const loginSuccess = (respons) => ({
    type: LOGIN_SUCCESS,
    payload: respons
})

export const loginFailed = (message) => ({
    type: LOGIN_FAILED,
    payload: message
})

/**
 * Logout
 */

export const logout = (navigate) => ({
    type: LOGOUT,
    payload: navigate
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: null,
})
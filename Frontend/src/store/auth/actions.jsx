import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT, LOGOUT_SUCCESS, 
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILED, AUTH_INFO, AUTH_INFO_SUCCESS, AUTH_INFO_FAILED
} from "./actionTypes";

/**
 * 
 */
export const register = (account, navigate) => ({
    type: REGISTER,
    payload: {account,navigate}
})
export const registerSuccess = (respons) => ({
    type: REGISTER_SUCCESS,
    payload: respons
})
export const registerFailed = (message) => ({
    type: REGISTER_FAILED,
    payload: message
})

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
 * Auth
 */
export const authInfo = () => ({
    type: AUTH_INFO,
    payload: null
})

export const authInfoSuccess = (respons) => ({
    type: AUTH_INFO_SUCCESS,
    payload: respons
})

export const authInfoFailed = (message) => ({
    type: AUTH_INFO_FAILED,
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
import { CLEAR_FINED_MESSAGE, GET_FINED, GET_FINED_FAILED, GET_FINED_SUCCES, PUT_FINED, PUT_FINED_FAILED, PUT_FINED_SUCCESS } from "./actionTypes";

export const getFined = () => ({
    type: GET_FINED,
    payload: null
})
export const getFinedSuccess = (response) => ({
    type: GET_FINED_SUCCES,
    payload: response
})
export const getFinedFailed = (message) => ({
    type: GET_FINED_FAILED,
    payload: message
})

export const putFined = (data) => ({
    type: PUT_FINED,
    payload: data
})
export const putFinedSuccess = (message) => ({
    type: PUT_FINED_SUCCESS,
    payload: message
})
export const putFinedFailed = (message) => ({
    type: PUT_FINED_FAILED,
    payload: message
})

export const clearFinedMessage = () => ({
    type: CLEAR_FINED_MESSAGE,
    payload: null
})
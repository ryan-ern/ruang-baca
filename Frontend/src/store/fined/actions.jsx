import { GET_FINED, PUT_FINED } from "./actionTypes";

export const getFined = () => ({
    type: GET_FINED,
    payload: null
})
export const getFinedSuccess = (response) => ({
    type: GET_FINED,
    payload: response
})
export const getFinedFailed = (message) => ({
    type: GET_FINED,
    payload: message
})

export const putFined = (body) => ({
    type: PUT_FINED,
    payload: body
})
export const putFinedSuccess = (message) => ({
    type: PUT_FINED,
    payload: message
})
export const putFinedFailed = (message) => ({
    type: PUT_FINED,
    payload: message
})
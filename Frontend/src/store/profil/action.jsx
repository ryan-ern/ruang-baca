import { PUT_PROFILE, PUT_PROFILE_FAILED, PUT_PROFILE_SUCCESS } from "./actionTypes";

export const putProfil = (body) => ({
    type: PUT_PROFILE,
    payload: body
})
export const putProfilSuccess = () => ({
    type: PUT_PROFILE_SUCCESS,
    payload: null
})
export const putProfilFailed = (message) => ({
    type: PUT_PROFILE_FAILED,
    payload: message
})
import { CLEAR_JURUSAN_MESSAGES, DELETE_JURUSAN, DELETE_JURUSAN_SUCCESS, GET_JURUSAN, GET_JURUSAN_FAILED, GET_JURUSAN_SUCCESS, PATCH_JURUSAN, PATCH_JURUSAN_FAILED, PATCH_JURUSAN_SUCCESS, POST_JURUSAN, POST_JURUSAN_FAILED, POST_JURUSAN_SUCCESS } from "./actionTypes";

export const jurusan = () => ({
    type: GET_JURUSAN,
    payload: null
})
export const jurusanSuccess = (respons) => ({
    type: GET_JURUSAN_SUCCESS,
    payload: respons
})
export const jurusanFailed = (message) => ({
    type: GET_JURUSAN_FAILED,
    payload: message
})


export const postJurusan = (data, onHide) => ({
    type: POST_JURUSAN,
    payload: {data, onHide}
})
export const postJurusanSuccess = (message) => ({
    type: POST_JURUSAN_SUCCESS,
    payload: message
})
export const postJurusanFailed = (message) => ({
    type: POST_JURUSAN_FAILED,
    payload: message
})


export const patchJurusan = (id, data, onHide) => ({
    type: PATCH_JURUSAN,
    payload: {id, data, onHide}
})
export const patchJurusanSuccess = (message) => ({
    type: PATCH_JURUSAN_SUCCESS,
    payload: message
})
export const patchJurusanFailed = (message) => ({
    type: PATCH_JURUSAN_FAILED,
    payload: message
})


export const deleteJurusan = (id, onHide) => ({
    type: DELETE_JURUSAN,
    payload: {id, onHide}
})
export const deleteJurusanSuccess = (message) => ({
    type: DELETE_JURUSAN_SUCCESS,
    payload: message
})
// export const deleteJurusanFailed = (message) => ({
//     type: DELETE_JURUSAN_FAILED,
//     payload: message
// })


export const clearJurusanMessage = () => ({
    type: CLEAR_JURUSAN_MESSAGES,
    payload: null
})
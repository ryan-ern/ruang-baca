import { DOWNLOAD, DOWNLOAD_FAILED, DOWNLOAD_SUCCESS, GET_RETURN, GET_RETURN_ADMIN, GET_RETURN_ADMIN_FAILED, GET_RETURN_ADMIN_SUCCESS, GET_RETURN_FAILED, GET_RETURN_SUCCESS, POST_ACCEPT_RETURN, POST_ACCEPT_RETURN_FAILED, POST_ACCEPT_RETURN_SUCCESS, POST_RESET_RETURN, POST_RESET_RETURN_FAILED, POST_RESET_RETURN_SUCCESS } from "./actionTypes";

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


export const returnUser = () => ({
    type: GET_RETURN,
    payload: null,
})
export const returnUserSuccess = (respons) => ({
    type: GET_RETURN_SUCCESS,
    payload: respons,
})
export const returnUserFailed = (message) => ({
    type: GET_RETURN_FAILED,
    payload: message,
})



export const postAcceptReturn = (id) => ({
    type: POST_ACCEPT_RETURN,
    payload: { id }

})
export const postReturnSuccess = (respons) => ({
    type: POST_ACCEPT_RETURN_SUCCESS,
    payload: respons

})
export const postReturnFailed = (message) => ({
    type: POST_ACCEPT_RETURN_FAILED,
    payload: message
})



export const postResetReturn = (id) => ({
    type: POST_RESET_RETURN,
    payload: { id }

})
export const postResetReturnSuccess = (message) => ({
    type: POST_RESET_RETURN_SUCCESS,
    payload: message

})
export const postResetReturnFailed = (message) => ({
    type: POST_RESET_RETURN_FAILED,
    payload: message
})


export const downloadReturn = (startDate, endDate) => ({
    type: DOWNLOAD,
    payload: { startDate, endDate },
});

export const downloadReturnSuccess = (respons) => ({
    type: DOWNLOAD_SUCCESS,
    payload: respons,
})

export const downloadReturnFailed = (message) => ({
    type: DOWNLOAD_FAILED,
    payload: message
})
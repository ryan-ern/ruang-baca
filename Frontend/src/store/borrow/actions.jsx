import { CLEAR_BORROW_MESSAGE, DELETE_BORROW, DELETE_BORROW_SUCCESS, DOWNLOAD_BORROW, DOWNLOAD_BORROW_FAILED, DOWNLOAD_BORROW_SUCCESS, GET_BORROW, GET_BORROW_ADMIN, GET_BORROW_ADMIN_FAILED, GET_BORROW_ADMIN_SUCCESS, GET_BORROW_FAILED, GET_BORROW_SUCCESS, POST_ACCEPT_BORROW, POST_ACCEPT_BORROW_FAILED, POST_ACCEPT_BORROW_SUCCESS, POST_BORROW, POST_BORROW_FAILED, POST_BORROW_SUCCESS, POST_DENIED_BORROW, POST_DENIED_BORROW_FAILED, POST_DENIED_BORROW_SUCCESS } from "./actionTypes";

export const borrow = () => ({
    type: GET_BORROW,
    payload: null,
})
export const borrowSuccess = (respons) => ({
    type: GET_BORROW_SUCCESS,
    payload: respons,
})
export const borrowFailed = (message) => ({
    type: GET_BORROW_FAILED,
    payload: message,
})


export const borrowAdmin = () => ({
    type: GET_BORROW_ADMIN,
    payload: null,
})
export const borrowAdminSuccess = (respons) => ({
    type: GET_BORROW_ADMIN_SUCCESS,
    payload: respons,
})
export const borrowAdminFailed = (message) => ({
    type: GET_BORROW_ADMIN_FAILED,
    payload: message,
})


export const postBorrow = (isbn, navigate) => ({
    type: POST_BORROW,
    payload: { isbn, navigate }
})
export const postBorrowSuccess = (respons) => ({
    type: POST_BORROW_SUCCESS,
    payload: respons,
})
export const postBorrowFailed = (message) => ({
    type: POST_BORROW_FAILED,
    payload: message,
})


export const postAcceptBorrow = (id) => ({
    type: POST_ACCEPT_BORROW,
    payload: { id },
})
export const postAcceptBorrowSuccess = (respons) => ({
    type: POST_ACCEPT_BORROW_SUCCESS,
    payload: respons,
})
export const postAcceptBorrowFailed = (message) => ({
    type: POST_ACCEPT_BORROW_FAILED,
    payload: message,
})


export const postDeniedBorrow = (id) => ({
    type: POST_DENIED_BORROW,
    payload: { id },
})
export const postDeniedBorrowSuccess = (respons) => ({
    type: POST_DENIED_BORROW_SUCCESS,
    payload: respons,
})
export const postDeniedBorrowFailed = (message) => ({
    type: POST_DENIED_BORROW_FAILED,
    payload: message,
})


export const deleteBorrow = (id) => ({
    type: DELETE_BORROW,
    payload: id,
})
export const deleteBorrowSuccess = (respons) => ({
    type: DELETE_BORROW_SUCCESS,
    payload: respons,
})

export const downloadBorrow = (startDate, endDate) => ({
    type: DOWNLOAD_BORROW,
    payload: { startDate, endDate },
});

export const downloadBorrowSuccess = (respons) => ({
    type: DOWNLOAD_BORROW_SUCCESS,
    payload: respons,
})

export const downloadBorrowFailed = (message) => ({
    type: DOWNLOAD_BORROW_FAILED,
    payload: message
})

export const clearBorrowMessage = () => ({
    type: CLEAR_BORROW_MESSAGE,
    payload: null
})
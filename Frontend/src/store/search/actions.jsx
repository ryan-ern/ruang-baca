import { GET_SEARCH_BY_BORROW_DATE, GET_SEARCH_BY_BORROW_DATE_ADMIN, GET_SEARCH_BY_BORROW_DATE_ADMIN_FAILED, GET_SEARCH_BY_BORROW_DATE_ADMIN_SUCCESS, GET_SEARCH_BY_BORROW_DATE_FAILED, GET_SEARCH_BY_BORROW_DATE_SUCCESS, GET_SEARCH_BY_JUDUL, GET_SEARCH_BY_JUDUL_FAILED, GET_SEARCH_BY_JUDUL_RESET, GET_SEARCH_BY_JUDUL_SUCCESS, GET_SEARCH_BY_JURUSAN, GET_SEARCH_BY_JURUSAN_FAILED, GET_SEARCH_BY_JURUSAN_SUCCESS, GET_SEARCH_BY_RETURN_DATE, GET_SEARCH_BY_RETURN_DATE_ADMIN, GET_SEARCH_BY_RETURN_DATE_ADMIN_FAILED, GET_SEARCH_BY_RETURN_DATE_ADMIN_SUCCESS, GET_SEARCH_BY_RETURN_DATE_FAILED, GET_SEARCH_BY_RETURN_DATE_SUCCESS, RESET_MESSAGE } from "./actionTypes"

export const getSearchByJurusan = (jurusan) => ({
    type: GET_SEARCH_BY_JURUSAN,
    payload: {jurusan}
    
})
export const getSearchByJurusanSuccess = (respons) => ({
    type: GET_SEARCH_BY_JURUSAN_SUCCESS,
    payload: respons
    
})
export const getSearchByJurusanFailed = (message) => ({
    type: GET_SEARCH_BY_JURUSAN_FAILED,
    payload: message
})



export const getSearchByJudul = (judul) => ({
    type: GET_SEARCH_BY_JUDUL,
    payload: {judul}
    
})
export const getSearchByJudulSuccess = (respons) => ({
    type: GET_SEARCH_BY_JUDUL_SUCCESS,
    payload: respons
    
})
export const getSearchByJudulFailed = (message) => ({
    type: GET_SEARCH_BY_JUDUL_FAILED,
    payload: message
})
export const getSearchByJudulReset= () => ({
    type: GET_SEARCH_BY_JUDUL_RESET,
    payload: null
})



export const getSearchByBorrowDate = (date) => ({
    type: GET_SEARCH_BY_BORROW_DATE,
    payload: {date}
    
})
export const getSearchByBorrowDateSuccess = (respons) => ({
    type: GET_SEARCH_BY_BORROW_DATE_SUCCESS,
    payload: respons
    
})
export const getSearchByBorrowDateFailed = (message) => ({
    type: GET_SEARCH_BY_BORROW_DATE_FAILED,
    payload: message
})



export const getSearchByBorrowDateAdmin = (date) => ({
    type: GET_SEARCH_BY_BORROW_DATE_ADMIN,
    payload: {date}
    
})
export const getSearchByBorrowDateAdminSuccess = (respons) => ({
    type: GET_SEARCH_BY_BORROW_DATE_ADMIN_SUCCESS,
    payload: respons
    
})
export const getSearchByBorrowDateAdminFailed = (message) => ({
    type: GET_SEARCH_BY_BORROW_DATE_ADMIN_FAILED,
    payload: message
})
export const resetMessage = () => ({
    type: RESET_MESSAGE,
    payload: null
})



export const getSearchByReturnDate = (date) => ({
    type: GET_SEARCH_BY_RETURN_DATE,
    payload: {date}
    
})
export const getSearchByReturnDateSuccess = (respons) => ({
    type: GET_SEARCH_BY_RETURN_DATE_SUCCESS,
    payload: respons
    
})
export const getSearchByReturnDateFailed = (message) => ({
    type: GET_SEARCH_BY_RETURN_DATE_FAILED,
    payload: message
})




export const getSearchByReturnDateAdmin = (date) => ({
    type: GET_SEARCH_BY_RETURN_DATE_ADMIN,
    payload: {date}
    
})
export const getSearchByReturnDateAdminSuccess = (respons) => ({
    type: GET_SEARCH_BY_RETURN_DATE_ADMIN_SUCCESS,
    payload: respons
    
})
export const getSearchByReturnDateAdminFailed = (message) => ({
    type: GET_SEARCH_BY_RETURN_DATE_ADMIN_FAILED,
    payload: message
})



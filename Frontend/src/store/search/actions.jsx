import { POST_SEARCH_BY_BORROW_DATE, POST_SEARCH_BY_BORROW_DATE_ADMIN, POST_SEARCH_BY_BORROW_DATE_ADMIN_FAILED, POST_SEARCH_BY_BORROW_DATE_ADMIN_SUCCESS, POST_SEARCH_BY_BORROW_DATE_FAILED, POST_SEARCH_BY_BORROW_DATE_SUCCESS, POST_SEARCH_BY_JUDUL, POST_SEARCH_BY_JUDUL_FAILED, POST_SEARCH_BY_JUDUL_SUCCESS, POST_SEARCH_BY_JURUSAN, POST_SEARCH_BY_JURUSAN_FAILED, POST_SEARCH_BY_JURUSAN_SUCCESS, POST_SEARCH_BY_RETURN_DATE, POST_SEARCH_BY_RETURN_DATE_ADMIN, POST_SEARCH_BY_RETURN_DATE_ADMIN_FAILED, POST_SEARCH_BY_RETURN_DATE_ADMIN_SUCCESS, POST_SEARCH_BY_RETURN_DATE_FAILED, POST_SEARCH_BY_RETURN_DATE_SUCCESS } from "./actionTypes"

export const postSearchByJurusan = (jurusan) => ({
    type: POST_SEARCH_BY_JURUSAN,
    payload: {jurusan}
    
})
export const postSearchByJurusanSuccess = (respons) => ({
    type: POST_SEARCH_BY_JURUSAN_SUCCESS,
    payload: respons
    
})
export const postSearchByJurusanFailed = (message) => ({
    type: POST_SEARCH_BY_JURUSAN_FAILED,
    payload: message
})



export const postSearchByJudul = (judul) => ({
    type: POST_SEARCH_BY_JUDUL,
    payload: {judul}
    
})
export const postSearchByJudulSuccess = (respons) => ({
    type: POST_SEARCH_BY_JUDUL_SUCCESS,
    payload: respons
    
})
export const postSearchByJudulFailed = (message) => ({
    type: POST_SEARCH_BY_JUDUL_FAILED,
    payload: message
})



export const postSearchByBorrowDate = (date) => ({
    type: POST_SEARCH_BY_BORROW_DATE,
    payload: {date}
    
})
export const postSearchByBorrowDateSuccess = (respons) => ({
    type: POST_SEARCH_BY_BORROW_DATE_SUCCESS,
    payload: respons
    
})
export const postSearchByBorrowDateFailed = (message) => ({
    type: POST_SEARCH_BY_BORROW_DATE_FAILED,
    payload: message
})



export const postSearchByBorrowDateAdmin = (date) => ({
    type: POST_SEARCH_BY_BORROW_DATE_ADMIN,
    payload: {date}
    
})
export const postSearchByBorrowDateAdminSuccess = (respons) => ({
    type: POST_SEARCH_BY_BORROW_DATE_ADMIN_SUCCESS,
    payload: respons
    
})
export const postSearchByBorrowDateAdminFailed = (message) => ({
    type: POST_SEARCH_BY_BORROW_DATE_ADMIN_FAILED,
    payload: message
})



export const postSearchByReturnDate = (date) => ({
    type: POST_SEARCH_BY_RETURN_DATE,
    payload: {date}
    
})
export const postSearchByReturnDateSuccess = (respons) => ({
    type: POST_SEARCH_BY_RETURN_DATE_SUCCESS,
    payload: respons
    
})
export const postSearchByReturnDateFailed = (message) => ({
    type: POST_SEARCH_BY_RETURN_DATE_FAILED,
    payload: message
})




export const postSearchByReturnDateAdmin = (date) => ({
    type: POST_SEARCH_BY_RETURN_DATE_ADMIN,
    payload: {date}
    
})
export const postSearchByReturnDateAdminSuccess = (respons) => ({
    type: POST_SEARCH_BY_RETURN_DATE_ADMIN_SUCCESS,
    payload: respons
    
})
export const postSearchByReturnDateAdminFailed = (message) => ({
    type: POST_SEARCH_BY_RETURN_DATE_ADMIN_FAILED,
    payload: message
})
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_DELETE_BORROW, URL_GET_BORROW, URL_GET_BORROW_ADMIN, URL_POST_ACCEPT_BORROW, URL_POST_BORROW, URL_POST_DENIED_BORROW } from "../../helper/urlHelper";
import { borrowAdminFailed, borrowAdminSuccess, borrowFailed, borrowSuccess, deleteBorrowSuccess, postAcceptBorrowFailed, postAcceptBorrowSuccess, postBorrowFailed, postBorrowSuccess, postDeniedBorrowFailed, postDeniedBorrowSuccess } from "./actions";
import { DELETE_BORROW, GET_BORROW, GET_BORROW_ADMIN, POST_ACCEPT_BORROW, POST_BORROW, POST_DENIED_BORROW } from "./actionTypes";

export function* getBorrowAdminSaga() {
    try {
        const response = yield call(axios.get, URL_GET_BORROW_ADMIN)
        yield put(borrowAdminSuccess(response.data))
    }
    catch (err) {
        yield put(borrowAdminFailed(err.response.message))
    }
}
export function* getBorrowSaga() {
    try {
        const response = yield call(axios.get, URL_GET_BORROW)
        yield put(borrowSuccess(response.data))
    }
    catch (err) {
        yield put(borrowFailed(err.response.message))
    }
}
export function* postBorrowSaga({payload:{isbn, navigate}}) {
    try {
        const response = yield call(axios.post, URL_POST_BORROW.replace(':isbn', isbn))
        yield put(postBorrowSuccess(response.data))
        navigate('/panel/peminjaman')
    }
    catch (err) {
        yield put(postBorrowFailed(err))
    }
}
export function* postAcceptBorrowSaga({payload:{id}}) {
    try {
        const response = yield call(axios.post, URL_POST_ACCEPT_BORROW.replace(':id', id))
        yield put(postAcceptBorrowSuccess(response.data))
    }
    catch (err) {
        yield put(postAcceptBorrowFailed(err.response.message))
    }
}
export function* postDeniedBorrowSaga({payload:{id}}) {
    try {
        const response = yield call(axios.post, URL_POST_DENIED_BORROW.replace(':id', id))
        yield put(postDeniedBorrowSuccess(response))
    }
    catch (err) {
        yield put(postDeniedBorrowFailed(err.response.message))
    }
}
export function* DeleteBorrowSaga({payload:{id}}) {
    try {
        const response = yield call(axios.post, URL_DELETE_BORROW.replace(':id', id))
        yield put(deleteBorrowSuccess(response))
    }
    catch (err) {
        //
    }
}

export function* borrowSaga() {
    yield takeEvery(GET_BORROW, getBorrowSaga),
    yield takeEvery(GET_BORROW_ADMIN, getBorrowAdminSaga),
    yield takeEvery(POST_BORROW, postBorrowSaga),
    yield takeEvery(POST_ACCEPT_BORROW, postAcceptBorrowSaga),
    yield takeEvery(POST_DENIED_BORROW, postDeniedBorrowSaga),
    yield takeEvery(DELETE_BORROW, DeleteBorrowSaga)
}
import { call, put, takeEvery } from "redux-saga/effects"
import axios from "../../helper/apiHelper"
import { GET_SEARCH_BY_BORROW_DATE, GET_SEARCH_BY_BORROW_DATE_ADMIN, GET_SEARCH_BY_JUDUL, GET_SEARCH_BY_JURUSAN, GET_SEARCH_BY_RETURN_DATE, GET_SEARCH_BY_RETURN_DATE_ADMIN } from "./actionTypes"
import { URL_SEARCH_BORROW_BY_DATE, URL_SEARCH_BORROW_BY_DATE_ADMIN, URL_SEARCH_BY_JUDUL, URL_SEARCH_BY_JURUSAN, URL_SEARCH_RETURN_BY_DATE, URL_SEARCH_RETURN_BY_DATE_ADMIN } from "../../helper/urlHelper"
import { getSearchByBorrowDateAdminFailed, getSearchByBorrowDateAdminSuccess, getSearchByBorrowDateFailed, getSearchByBorrowDateSuccess, getSearchByJudulFailed, getSearchByJudulSuccess, getSearchByJurusanFailed, getSearchByJurusanSuccess, getSearchByReturnDateAdminFailed, getSearchByReturnDateAdminSuccess, getSearchByReturnDateFailed, getSearchByReturnDateSuccess } from "./actions"

export function* getSearchByJurusanSaga({payload:{jurusan}}) {
    try {
        const response = yield call(axios.get, URL_SEARCH_BY_JURUSAN.replace(':jurusan', jurusan))
        yield put(getSearchByJurusanSuccess(response.data))
    } catch (err) {
        yield put(getSearchByJurusanFailed(err.response.data))
    }
}

export function* getSearchByJudulSaga({payload:{judul}}) {
    try {
        const response = yield call(axios.get, URL_SEARCH_BY_JUDUL.replace(':judul', judul))
        yield put(getSearchByJudulSuccess(response.data))
    } catch (err) {
        yield put(getSearchByJudulFailed(err.response.data))
    }
}

export function* getSearchByBorrowDateSaga({ payload: { date } }) {
    try {
        const response = yield call(axios.get, URL_SEARCH_BORROW_BY_DATE.replace(':date', date))
        yield put(getSearchByBorrowDateSuccess(response.data))
    } catch (err) {
        yield put(getSearchByBorrowDateFailed(err))
    }
}

export function* getSearchByBorrowDateAdminSaga({ payload: { date } }) {
    try {
        const response = yield call(axios.get, URL_SEARCH_BORROW_BY_DATE_ADMIN.replace(':date', date))
        yield put(getSearchByBorrowDateAdminSuccess(response.data))
    } catch (err) {
        yield put(getSearchByBorrowDateAdminFailed(err.response.data))
    }
}

export function* getSearchByReturnDateSaga({ payload: { date } }) {
    try {
        const response = yield call(axios.get, URL_SEARCH_RETURN_BY_DATE.replace(':date', date))
        yield put(getSearchByReturnDateSuccess(response.data))
    } catch (err) {
        yield put(getSearchByReturnDateFailed(err))
    }
}

export function* getSearchByReturnDateAdminSaga({ payload: { date } }) {
    try {
        const response = yield call(axios.get, URL_SEARCH_RETURN_BY_DATE_ADMIN.replace(':date', date))
        yield put(getSearchByReturnDateAdminSuccess(response.data))
    } catch (err) {
        yield put(getSearchByReturnDateAdminFailed(err))
    }
}

export function* searchSaga() {
    yield takeEvery(GET_SEARCH_BY_JURUSAN, getSearchByJurusanSaga)
    yield takeEvery(GET_SEARCH_BY_JUDUL, getSearchByJudulSaga)
    yield takeEvery(GET_SEARCH_BY_BORROW_DATE, getSearchByBorrowDateSaga)
    yield takeEvery(GET_SEARCH_BY_BORROW_DATE_ADMIN, getSearchByBorrowDateAdminSaga)
    yield takeEvery(GET_SEARCH_BY_RETURN_DATE, getSearchByReturnDateSaga)
    yield takeEvery(GET_SEARCH_BY_RETURN_DATE_ADMIN, getSearchByReturnDateAdminSaga)

}
import { call, put, takeEvery } from "redux-saga/effects"
import axios from "../../helper/apiHelper"
import { POST_SEARCH_BY_BORROW_DATE, POST_SEARCH_BY_BORROW_DATE_ADMIN, POST_SEARCH_BY_JUDUL, POST_SEARCH_BY_JURUSAN, POST_SEARCH_BY_RETURN_DATE, POST_SEARCH_BY_RETURN_DATE_ADMIN } from "./actionTypes"
import { URL_SEARCH_BORROW_BY_DATE, URL_SEARCH_BORROW_BY_DATE_ADMIN, URL_SEARCH_BY_JUDUL, URL_SEARCH_BY_JURUSAN, URL_SEARCH_RETURN_BY_DATE, URL_SEARCH_RETURN_BY_DATE_ADMIN } from "../../helper/urlHelper"
import { postSearchByBorrowDateAdminFailed, postSearchByBorrowDateAdminSuccess, postSearchByBorrowDateFailed, postSearchByBorrowDateSuccess, postSearchByJudulFailed, postSearchByJudulSuccess, postSearchByJurusanFailed, postSearchByJurusanSuccess, postSearchByReturnDateAdminFailed, postSearchByReturnDateAdminSuccess, postSearchByReturnDateFailed, postSearchByReturnDateSuccess } from "./actions"

export function* postSearchByJurusanSaga({payload:{jurusan}}) {
    try {
        const response = yield call(axios.post, URL_SEARCH_BY_JURUSAN.replace(':jurusan', jurusan))
        yield put(postSearchByJurusanSuccess(response.data))
    } catch (err) {
        yield put(postSearchByJurusanFailed(err))
    }
}

export function* postSearchByJudulSaga({payload:{judul}}) {
    try {
        const response = yield call(axios.post, URL_SEARCH_BY_JUDUL.replace(':judul', judul))
        yield put(postSearchByJudulSuccess(response.data))
    } catch (err) {
        yield put(postSearchByJudulFailed(err))
    }
}

export function* postSearchByBorrowDateSaga({ payload: { date } }) {
    try {
        const response = yield call(axios.post, URL_SEARCH_BORROW_BY_DATE.replace(':date', date))
        yield put(postSearchByBorrowDateSuccess(response.data))
    } catch (err) {
        yield put(postSearchByBorrowDateFailed(err))
    }
}

export function* postSearchByBorrowDateAdminSaga({ payload: { date } }) {
    try {
        const response = yield call(axios.post, URL_SEARCH_BORROW_BY_DATE_ADMIN.replace(':date', date))
        yield put(postSearchByBorrowDateAdminSuccess(response.data))
    } catch (err) {
        yield put(postSearchByBorrowDateAdminFailed(err))
    }
}

export function* postSearchByReturnDateSaga({ payload: { date } }) {
    try {
        const response = yield call(axios.post, URL_SEARCH_RETURN_BY_DATE.replace(':date', date))
        yield put(postSearchByReturnDateSuccess(response.data))
    } catch (err) {
        yield put(postSearchByReturnDateFailed(err))
    }
}

export function* postSearchByReturnDateAdminSaga({ payload: { date } }) {
    try {
        const response = yield call(axios.post, URL_SEARCH_RETURN_BY_DATE_ADMIN.replace(':date', date))
        yield put(postSearchByReturnDateAdminSuccess(response.data))
    } catch (err) {
        yield put(postSearchByReturnDateAdminFailed(err))
    }
}

export function* searchSaga() {
    yield takeEvery(POST_SEARCH_BY_JURUSAN, postSearchByJurusanSaga)
    yield takeEvery(POST_SEARCH_BY_JUDUL, postSearchByJudulSaga)
    yield takeEvery(POST_SEARCH_BY_BORROW_DATE, postSearchByBorrowDateSaga)
    yield takeEvery(POST_SEARCH_BY_BORROW_DATE_ADMIN, postSearchByBorrowDateAdminSaga)
    yield takeEvery(POST_SEARCH_BY_RETURN_DATE, postSearchByReturnDateSaga)
    yield takeEvery(POST_SEARCH_BY_RETURN_DATE_ADMIN, postSearchByReturnDateAdminSaga)

}
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_GET_RETURN, URL_GET_RETURN_USER, URL_POST_ACCEPT_RETURN } from "../../helper/urlHelper";
import { postReturnFailed, postReturnSuccess, returnAdmin, returnAdminFailed, returnAdminSuccess, returnUserFailed, returnUserSuccess } from "./actions";
import { GET_RETURN, GET_RETURN_ADMIN, POST_ACCEPT_RETURN } from "./actionTypes";

export function* getReturnAdminSaga() {
    try {
        const response = yield call(axios.get, URL_GET_RETURN)
        yield put(returnAdminSuccess(response))
    } catch (err) {
        yield put(returnAdminFailed(err))
    }
}
export function* getReturnSaga() {
    try {
        const response = yield call(axios.get, URL_GET_RETURN_USER)
        yield put(returnUserSuccess(response))
    } catch (err) {
        yield put(returnUserFailed(err))
    }
}
export function* postReturnSaga({payload:{id}}) {
    try {
        const response = yield call(axios.post, URL_POST_ACCEPT_RETURN.replace(':id', id))
        yield put(postReturnSuccess(response.data))
        yield put(returnAdmin())
    } catch (err) {
        yield put(postReturnFailed(err))
    }
}

export function* returnSaga() {
    yield takeEvery(GET_RETURN_ADMIN, getReturnAdminSaga)
    yield takeEvery(GET_RETURN, getReturnSaga)
    yield takeEvery(POST_ACCEPT_RETURN, postReturnSaga)
}
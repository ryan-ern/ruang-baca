import { call, put, takeEvery } from "redux-saga/effects"
import axios from "../../helper/apiHelper"
import { URL_GET_FINED, URL_PUT_FINED } from "../../helper/urlHelper"
import { getFined, getFinedFailed, getFinedSuccess, putFinedFailed, putFinedSuccess } from "./actions"
import { GET_FINED, PUT_FINED } from "./actionTypes"

export function* getFinedSaga() {
    try {
        const response = yield call(axios.get, URL_GET_FINED)
        yield put(getFinedSuccess(response.data))
    } catch (err) {
        yield put(getFinedFailed(err))
    }
}

export function* putFinedSaga({ payload: data }) {
    try {
        const response = yield call(axios.put, URL_PUT_FINED, data)
        yield put(putFinedSuccess(response))
        yield put(getFined())
    } catch (err) {
        yield put(putFinedFailed(err))
    }
}

export function* finedSaga() {
    yield takeEvery(GET_FINED, getFinedSaga)
    yield takeEvery(PUT_FINED, putFinedSaga)
}

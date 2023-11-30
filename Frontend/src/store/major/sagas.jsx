import { call, put, takeEvery } from "redux-saga/effects";
import { deleteJurusanSuccess, jurusan, jurusanFailed, jurusanSuccess, patchJurusanFailed, patchJurusanSuccess, postJurusanFailed, postJurusanSuccess } from "./actions";
import axios from "../../helper/apiHelper";
import { URL_DELETE_JURUSAN, URL_GET_JURUSAN, URL_PATCH_JURUSAN, URL_POST_JURUSAN } from "../../helper/urlHelper";
import { DELETE_JURUSAN, GET_JURUSAN, PATCH_JURUSAN, POST_JURUSAN } from "./actionTypes";

export function* postJurusanSaga({ payload: { data, onHide } }) {
    try {
        const response = yield call(axios.post, URL_POST_JURUSAN, data)
        yield put(postJurusanSuccess(response))
        yield put(jurusan())
        yield call(onHide)
    } catch (err) {
        yield put(postJurusanFailed(err.response.message))
    }
}
export function* patchJurusanSaga({ payload: { id, data, onHide } }) {
    try {
        const response = yield call(axios.patch, URL_PATCH_JURUSAN.replace(':id', id), data)
        yield put(patchJurusanSuccess(response))
        yield put(jurusan())
        yield call(onHide)
    } catch (err) {
        yield put(patchJurusanFailed(err.response.message))
    }
}
export function* deleteJurusanSaga({ payload: { id, onHide } }) {
    try {
        const response = yield call(axios.delete, URL_DELETE_JURUSAN.replace(':id', id))
        yield put(deleteJurusanSuccess(response))
        yield put(jurusan())
        yield call(onHide)
    } catch (err) {
        // yield put(deleteJurusanFailed(err.response.data))
    }
}
export function* getJurusanSaga() {
    try {
        const response = yield call(axios.get, URL_GET_JURUSAN)
        yield put(jurusanSuccess(response))
    } catch (err) {
        yield put(jurusanFailed(err.response.message))
    }
}

export function* majorSaga() {
    yield takeEvery(POST_JURUSAN, postJurusanSaga),
    yield takeEvery(PATCH_JURUSAN, patchJurusanSaga),
    yield takeEvery(DELETE_JURUSAN, deleteJurusanSaga),
    yield takeEvery(GET_JURUSAN, getJurusanSaga)
}
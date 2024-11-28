import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { saveAs } from 'file-saver';
import { URL_DOWNLOAD_RETURN, URL_GET_RETURN, URL_GET_RETURN_USER, URL_POST_ACCEPT_RETURN, URL_POST_RESET_RETURN } from "../../helper/urlHelper";
import { downloadReturn, downloadReturnFailed, postResetReturnFailed, postResetReturnSuccess, postReturnFailed, postReturnSuccess, returnAdmin, returnAdminFailed, returnAdminSuccess, returnUserFailed, returnUserSuccess } from "./actions";
import { DOWNLOAD, GET_RETURN, GET_RETURN_ADMIN, POST_ACCEPT_RETURN, POST_RESET_RETURN } from "./actionTypes";

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
export function* postReturnSaga({ payload: { id } }) {
    try {
        const response = yield call(axios.post, URL_POST_ACCEPT_RETURN.replace(':id', id))
        yield put(postReturnSuccess(response.data))
        yield put(returnAdmin())
    } catch (err) {
        yield put(postReturnFailed(err))
    }
}

export function* postResetReturnSaga({ payload: { id } }) {
    try {
        const response = yield call(axios.post, URL_POST_RESET_RETURN.replace(':id', id))
        yield put(postResetReturnSuccess(response))
        yield put(returnAdmin())
    }
    catch (err) {
        yield put(postResetReturnFailed(err))
    }
}

export function* DownloadSaga({ payload: { startDate, endDate } }) {
    try {
        // Kirim request POST dengan rentang tanggal
        const response = yield call(axios.post, URL_DOWNLOAD_RETURN, { startDate, endDate }, { responseType: 'blob' });

        // Tentukan nama file
        const fileName = `Pengembalian_${startDate}_${endDate}.xlsx`;

        // Simpan file menggunakan file-saver
        yield call(saveAs, new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);

        // Dispatch success action
        yield put(downloadReturn());
        yield put(returnAdmin());
    } catch (err) {
        const errorMessage = err.response?.data?.message || "Data tidak ditemukan, sehingga gagal mendownload data";

        yield put(downloadReturnFailed(errorMessage));
    }
}

export function* returnSaga() {
    yield takeEvery(GET_RETURN_ADMIN, getReturnAdminSaga)
    yield takeEvery(DOWNLOAD, DownloadSaga)
    yield takeEvery(GET_RETURN, getReturnSaga)
    yield takeEvery(POST_ACCEPT_RETURN, postReturnSaga)
    yield takeEvery(POST_RESET_RETURN, postResetReturnSaga)
}
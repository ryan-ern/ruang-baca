import { call, put, takeEvery } from "redux-saga/effects";
import { downloadPresent, downloadPresentFailed, generateBarcodeFailed, generateBarcodeSuccess, getPresent, getPresentFailed, getPresentSuccess, scanBarcodeFailed, scanBarcodeSuccess } from "./actions";
import axios from "../../helper/apiHelper";
import { URL_DOWNLOAD_PRESENT, URL_GENERATE_BARCODE, URL_GET_PRESENT, URL_SCAN } from "../../helper/urlHelper";
import { DOWNLOAD_PRESENTS, GENERATE_BARCODE, GET_PRESENT, SCAN_BARCODE } from "./actionTypes";
import { saveAs } from 'file-saver';

function* generateBarcodeSaga() {
    try {
        const response = yield call(axios.get, URL_GENERATE_BARCODE);
        yield put(generateBarcodeSuccess(response.data));
    } catch (err) {
        yield put(generateBarcodeFailed(err.message));
    }
}

function* scanBarcodeSaga({ payload: { data } }) {
    try {
        console.log(data);
        const response = yield call(axios.post, URL_SCAN, data);
        yield put(scanBarcodeSuccess(response.data));
    } catch (error) {
        yield put(scanBarcodeFailed(error.response.data));
    }
}

function* getPresentSaga() {
    try {
        const response = yield call(axios.get, URL_GET_PRESENT);
        yield put(getPresentSuccess(response.data));
    } catch (err) {
        yield put(getPresentFailed(err.message));
    }
}

function* DownloadPresentSaga({ payload: { startDate, endDate } }) {
    try {
        const response = yield call(axios.post, URL_DOWNLOAD_PRESENT, { startDate, endDate }, { responseType: 'blob' });

        const fileName = `Kehadiran_${startDate}_${endDate}.xlsx`;

        yield call(saveAs, new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);

        yield put(downloadPresent());
        yield put(getPresent());
    } catch (err) {
        const errorMessage = err.response?.data?.message || "Data tidak ditemukan, sehingga gagal mendownload data";

        yield put(downloadPresentFailed(errorMessage));
    }
}
export function* presentSaga() {
    yield takeEvery(GENERATE_BARCODE, generateBarcodeSaga);
    yield takeEvery(SCAN_BARCODE, scanBarcodeSaga);
    yield takeEvery(GET_PRESENT, getPresentSaga);
    yield takeEvery(DOWNLOAD_PRESENTS, DownloadPresentSaga);
}
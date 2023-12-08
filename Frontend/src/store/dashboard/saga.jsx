import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '../../helper/apiHelper';
import { URL_GET_DASHBOARD, URL_GET_WHATSAPP } from '../../helper/urlHelper';
import { dashboardFailed, dashboardSuccess, getWhatsappSuccess } from './actions';
import { GET_DASHBOARD, GET_WHATSAPP } from './actionTypes';

export function* getBookSaga() {
    try {
        const response = yield call(axios.get, URL_GET_DASHBOARD)
        yield put(dashboardSuccess(response.data))
    } catch (err) {
        yield put(dashboardFailed(err))
    }
}

export function* getWhatsappSaga() {
    try {
        const response = yield call(axios.get, URL_GET_WHATSAPP)
        // console.log(response)
        yield put(getWhatsappSuccess(response.data))
    }
    catch (err) {
        //
    }
}

export function* dashboardSaga() {
    yield takeEvery(GET_DASHBOARD, getBookSaga)
    yield takeEvery(GET_WHATSAPP, getWhatsappSaga)
}
export default dashboardSaga
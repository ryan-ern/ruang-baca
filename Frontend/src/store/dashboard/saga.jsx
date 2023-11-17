import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '../../helper/apiHelper';
import { URL_GET_DASHBOARD } from '../../helper/urlHelper';
import { dashboardFailed, dashboardSuccess } from './actions';
import { GET_DASHBOARD } from './actionTypes';

export function* getBookSaga() {
    try {
        const response = yield call(axios.get, URL_GET_DASHBOARD)
        yield put(dashboardSuccess(response.data))
    } catch (err) {
        yield put(dashboardFailed(err))
    }
}

export function* dashboardSaga() {
    yield takeEvery(GET_DASHBOARD, getBookSaga)
}
export default dashboardSaga
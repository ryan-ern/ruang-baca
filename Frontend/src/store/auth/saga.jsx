import { call, put, takeEvery } from 'redux-saga/effects'
import { URL_DELETE_LOGOUT, URL_GET_AUTH, URL_POST_FORGOT, URL_POST_LOGIN, URL_POST_REGISTER } from "../../helper/urlHelper";
import axios from '../../helper/apiHelper';
import { authInfo, authInfoFailed, authInfoSuccess, forgotFailed, forgotSuccess, loginFailed, loginSuccess, logoutSuccess, registerFailed, registerSuccess } from './actions';
import { AUTH_INFO, FORGOT, LOGIN, LOGOUT, REGISTER } from './actionTypes';
import Cookies from 'js-cookie';


export function* loginSaga({ payload: { account, navigate } }) {
    try {
        const response = yield call(axios.post, URL_POST_LOGIN, account)
        document.cookie = `acctoken=${response.data.acctoken}; path=/`;
        yield put(loginSuccess(response.data));
        yield put(authInfo())
        navigate('/panel');
    } catch (err) {
        const response = err.response;
        yield put(loginFailed(response))
    }
}

export function* registerSaga({ payload: { account, navigate } }) {
    try {
        const response = yield call(axios.post, URL_POST_REGISTER, account)
        yield put(registerSuccess(response.data));
        navigate('/login');
    } catch (err) {
        const response = err.response;
        yield put(registerFailed(response))
    }
}

export function* authInfoSaga() {
    const acctoken = Cookies.get('acctoken');
    if (!acctoken) {
        yield put(authInfoFailed())
        return
    }
    try {
        const response = yield call(axios.get, URL_GET_AUTH)
        yield put(authInfoSuccess(response.data))
    } catch (err) {
        yield put(authInfoFailed(err))
    }
}

export function* logoutSaga({ payload: navigate }) {
    try {
        yield call(axios.delete, URL_DELETE_LOGOUT)
        yield put(logoutSuccess())
        Cookies.remove('acctoken')
    } catch (err) {
        //
    }
    navigate('/')
}

export function* forgotSaga({ payload: { data, navigate } }) {
    try {
        const response = yield call(axios.post, URL_POST_FORGOT, data)
        yield put(forgotSuccess(response.data));
        navigate('/login');
    } catch (err) {
        const response = err.response;
        yield put(forgotFailed(response))
    }
}

export function* authSaga() {
    yield takeEvery(FORGOT, forgotSaga)
    yield takeEvery(LOGIN, loginSaga)
    yield takeEvery(REGISTER, registerSaga)
    yield takeEvery(LOGOUT, logoutSaga)
    yield takeEvery(AUTH_INFO, authInfoSaga)
}

export default authSaga;
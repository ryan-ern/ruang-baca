import {call, put, takeEvery} from 'redux-saga/effects'
import { URL_DELETE_LOGOUT, URL_POST_LOGIN, URL_POST_REGISTER } from "../../../helper/urlHelper";
import axios from '../../../helper/apiHelper';
import { loginFailed, loginSuccess, logoutSuccess, registerFailed, registerSuccess } from './actions';
import { LOGIN, LOGOUT, REGISTER } from './actionTypes';
// import Cookies from 'js-cookie';


export function* loginSaga({ payload: { account, navigate } }) {
    try {
        const response = yield call(axios.post, URL_POST_LOGIN, account)
        // Cookies.set('acctoken', response.data.acctoken)
        document.cookie = `acctoken=${response.data.acctoken}; path=/`;
        console.log(document.cookie.acctoken)
        yield put(loginSuccess(response.data));
        navigate('/panel');
    } catch (err) {
        const response = err.response.data;
        yield put(loginFailed(response.message))
    }
}

export function* registerSaga({ payload: { account, navigate } }) {
    console.log(account)
    try {
        const response = yield call(axios.post, URL_POST_REGISTER, account)
        yield put(registerSuccess(response.data));
        navigate('/login');
    } catch (err) {
        const response = err.response.data;
        yield put(registerFailed(response.message))
    }

}

export function* logoutSaga({ payload: navigate }) {
    try {
        yield call(axios.delete, URL_DELETE_LOGOUT)
        yield put(logoutSuccess())
    } catch (err) {
        //
    }
    navigate('/')
}

export function* authSaga() {
    yield takeEvery(LOGIN, loginSaga),
    yield takeEvery(REGISTER, registerSaga),
    yield takeEvery(LOGOUT, logoutSaga)
}

export default authSaga;
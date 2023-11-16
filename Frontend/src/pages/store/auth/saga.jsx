import {call, put, takeEvery} from 'redux-saga/effects'
import { URL_POST_LOGIN, URL_POST_REGISTER } from "../../../helper/urlHelper";
import axios from '../../../helper/apiHelper';
import { loginFailed, loginSuccess, registerFailed, registerSuccess } from './actions';
import { LOGIN, REGISTER } from './actionTypes';


export function* loginSaga({ payload: { account, navigate } }) {
    try {
        const response = yield call(axios.post, URL_POST_LOGIN, account)
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

export function* authSaga() {
    yield takeEvery(LOGIN, loginSaga),
    yield takeEvery(REGISTER, registerSaga)
}

export default authSaga;
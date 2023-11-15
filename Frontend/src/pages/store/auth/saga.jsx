import {call, put, takeEvery} from 'redux-saga/effects'
import { URL_POST_LOGIN } from "../../../helper/urlHelper";
import axios from '../../../helper/apiHelper';
import { loginFailed, loginSuccess } from './actions';
import { LOGIN } from './actionTypes';


export function* loginSaga({ payload: { account, navigate } }) {
    const body = account;
    try {
        const response = yield call(axios.post, URL_POST_LOGIN, body)
        yield put(loginSuccess(response.data));
        navigate('/panel');
    } catch (err) {
        const response = err.response.data;
        yield put(loginFailed(response.message))
    }
}

export function* authSaga() {
    yield takeEvery(LOGIN, loginSaga)
}

export default authSaga;
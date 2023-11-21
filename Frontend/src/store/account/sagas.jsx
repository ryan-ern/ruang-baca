import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_DELETE_ACCOUNT, URL_EDIT_ACCOUNT, URL_GET_ACCOUNT } from "../../helper/urlHelper";
import { account, accountFailed, accountSuccess, editAccountSuccess } from "./actions";
import { DELETE_ACCOUNT, EDIT_ACCOUNT, GET_ACCOUNT } from "./actionTypes";

export function* getAccountSaga() {
    try {
        const respons = yield call(axios.get, URL_GET_ACCOUNT)
        yield put(accountSuccess(respons.data))
    }
    catch (err) {
        yield put(accountFailed(err))
    }
}
export function* deleteAccountSaga(username) {
    try {
        yield call(axios.delete, URL_DELETE_ACCOUNT.replace(':username', username.payload))
        yield put(account())
    }
    catch (err) {
        //
    }
}
export function* editAccountSaga({ payload: { username, data, onHide } }) {
    try {
        yield call(axios.post, URL_EDIT_ACCOUNT.replace(':username', username), data)
        yield put(editAccountSuccess())
        yield call(onHide)
        yield put(account())
    }
    catch (err) {
        //
    }
}

export function* accountSaga() {
    yield takeEvery(GET_ACCOUNT, getAccountSaga),
    yield takeEvery(DELETE_ACCOUNT, deleteAccountSaga),
    yield takeEvery(EDIT_ACCOUNT, editAccountSaga)
}

export default accountSaga
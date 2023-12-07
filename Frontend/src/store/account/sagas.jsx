import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_BLOCK_ACCOUNT, URL_DELETE_ACCOUNT, URL_EDIT_ACCOUNT, URL_GET_ACCOUNT, URL_POST_ADMIN, URL_POST_SUPERADMIN, URL_UNBLOCK_ACCOUNT } from "../../helper/urlHelper";
import { account, accountFailed, accountSuccess, deleteAccountSuccess, editAccountSuccess, postAccountAdminSuccess, postAccountSuperSuccess, postBlockSuccess, postUnblockSuccess } from "./actions";
import { DELETE_ACCOUNT, EDIT_ACCOUNT, GET_ACCOUNT, POST_ACCOUNT_ADMIN, POST_ACCOUNT_SUPER, POST_BLOCK, POST_UNBLOCK } from "./actionTypes";

export function* getAccountSaga() {
    try {
        const respons = yield call(axios.get, URL_GET_ACCOUNT)
        yield put(accountSuccess(respons.data))
    }
    catch (err) {
        yield put(accountFailed(err))
    }
}
export function* deleteAccountSaga({ payload: { username, onHide } }) {
    try {
        const response = yield call(axios.delete, URL_DELETE_ACCOUNT.replace(':username', username))
        yield put(deleteAccountSuccess(response.data))
        yield call(onHide)
        yield put(account())
    }
    catch (err) {
        //
    }
}
export function* editAccountSaga({ payload: { username, data, onHide } }) {
    try {
        const response = yield call(axios.post, URL_EDIT_ACCOUNT.replace(':username', username), data)
        yield put(editAccountSuccess(response))
        yield call(onHide)
        yield put(account())
    }
    catch (err) {
        //
    }
}
export function* postAdminSaga({ payload: { data, onHide } }) {
    try {
        const response = yield call(axios.post, URL_POST_ADMIN, data)
        yield put(postAccountAdminSuccess(response))
        yield call(onHide)
        yield put(account())
    }
    catch (err) {
        //
    }
}
export function* postSuperSaga({ payload: { data, onHide } }) {
    try {
        const response = yield call(axios.post, URL_POST_SUPERADMIN, data)
        yield put(postAccountSuperSuccess(response))
        yield call(onHide)
        yield put(account())
    }
    catch (err) {
        //
    }
}

export function* postBlockSaga({ payload: { nisn } }) {
    try {
        const response = yield call(axios.post, URL_BLOCK_ACCOUNT.replace(":nisn", nisn))
        yield put(postBlockSuccess(response.data))
        yield put(account())
    }
    catch (err) {
        // 
    }
}
export function* postUnblockSaga({ payload: { nisn } }) {
    try {
        const response = yield call(axios.post, URL_UNBLOCK_ACCOUNT.replace(":nisn", nisn))
        yield put(postUnblockSuccess(response.data))
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
    yield takeEvery(POST_ACCOUNT_ADMIN, postAdminSaga),
    yield takeEvery(POST_ACCOUNT_SUPER, postSuperSaga),
    yield takeEvery(POST_BLOCK, postBlockSaga),
    yield takeEvery(POST_UNBLOCK, postUnblockSaga)
}

export default accountSaga
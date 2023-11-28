import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_GET_RETURN } from "../../helper/urlHelper";
import { returnAdminFailed, returnAdminSuccess } from "./actions";
import { GET_RETURN_ADMIN } from "./actionTypes";

export function* getReturnAdminSaga() {
    try {
        const response = yield call(axios.get, URL_GET_RETURN)
        yield put(returnAdminSuccess(response))
    } catch (err) {
        yield put(returnAdminFailed(err))
    }
}

export function* returnSaga() {
    yield takeEvery(GET_RETURN_ADMIN, getReturnAdminSaga)
}
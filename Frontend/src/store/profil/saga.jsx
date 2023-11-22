import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_PUT_PROFIL } from "../../helper/urlHelper";
import { putProfilFailed, putProfilSuccess } from "./action";
import { PUT_PROFILE } from "./actionTypes";
import { authInfo } from "../actions";
function* putProfilSaga({ payload: body }) {
    try {
        const response = yield call(axios.patch, URL_PUT_PROFIL, body)
        yield put(putProfilSuccess(response))
        yield put(authInfo())
    } catch (err) {
        yield put(putProfilFailed(err.response.data))
    }
}

function* profilSaga() {
    yield takeEvery(PUT_PROFILE, putProfilSaga)
}

export default profilSaga
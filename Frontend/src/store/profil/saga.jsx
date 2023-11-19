import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_PUT_PROFIL } from "../../helper/urlHelper";
import { putProfilFailed, putProfilSuccess } from "./action";
import { PUT_PROFILE } from "./actionTypes";
function* putProfilSaga({ payload: body }) {
    try {
        yield call(axios.patch, URL_PUT_PROFIL, body)
        yield put(putProfilSuccess())
    } catch (err) {
        yield put(putProfilFailed(err.response.data))
    }
}

function* profilSaga() {
    yield takeEvery(PUT_PROFILE, putProfilSaga)
}

export default profilSaga
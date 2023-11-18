import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_GET_INVENTORY } from "../../helper/urlHelper";
import {inventoryFailed, inventorySuccess} from './actions'
import { GET_INVENTORY } from "./actionTypes";

export function* getInventorySaga() {
    try {
        const response = yield call(axios.get, URL_GET_INVENTORY)
        yield put(inventorySuccess(response.data))
    } catch (err) {
        yield put(inventoryFailed(err))
    }
}

export function* inventorySaga() {
    yield takeEvery(GET_INVENTORY, getInventorySaga)
}

export default inventorySaga
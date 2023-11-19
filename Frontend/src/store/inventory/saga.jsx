import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_GET_INVENTORY, URL_POST_INVENTORY } from "../../helper/urlHelper";
import {inventory, inventoryFailed, inventorySuccess, postInventoryFailed, postInventorySuccess} from './actions'
import { GET_INVENTORY, POST_INVENTORY } from "./actionTypes";

export function* postInventorySaga({payload: {data, onHide}}) {
    try {
        yield call(axios.post, URL_POST_INVENTORY, data)
        yield put(postInventorySuccess())
        yield put(inventory())
        yield call(onHide)
    } catch (err) {
        yield put(postInventoryFailed(err.response.message))
    }
}

export function* getInventorySaga() {
    try {
        const response = yield call(axios.get, URL_GET_INVENTORY)
        yield put(inventorySuccess(response.data))
    } catch (err) {
        yield put(inventoryFailed(err))
    }
}

export function* inventorySaga() {
    yield takeEvery(POST_INVENTORY, postInventorySaga)
    yield takeEvery(GET_INVENTORY, getInventorySaga)
}

export default inventorySaga
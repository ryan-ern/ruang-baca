import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_EDIT_INVENTORY, URL_GET_INVENTORY, URL_POST_INVENTORY } from "../../helper/urlHelper";
import {editInventoryFailed, editInventorySuccess, inventory, inventoryFailed, inventorySuccess, postInventoryFailed, postInventorySuccess} from './actions'
import { EDIT_INVENTORY, GET_INVENTORY, POST_INVENTORY } from "./actionTypes";

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
export function* editInventorySaga({payload: {isbn, data, onHide}}) {
    try {
        yield call(axios.post, URL_EDIT_INVENTORY.replace(':isbn',isbn), data)
        yield put(editInventorySuccess())
        yield put(inventory())
        yield call(onHide)
    } catch (err) {
        yield put(editInventoryFailed(err.response.message))
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
    yield takeEvery(POST_INVENTORY, postInventorySaga),
    yield takeEvery(GET_INVENTORY, getInventorySaga),
    yield takeEvery(EDIT_INVENTORY, editInventorySaga)
}

export default inventorySaga
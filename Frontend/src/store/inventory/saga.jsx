import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../helper/apiHelper";
import { URL_DELETE_INVENTORY, URL_EDIT_INVENTORY, URL_GET_INVENTORY, URL_POST_INVENTORY } from "../../helper/urlHelper";
import {deleteInventorySuccess, editInventoryFailed, editInventorySuccess, inventory, inventoryFailed, inventorySuccess, postInventoryFailed, postInventorySuccess} from './actions'
import { DELETE_INVENTORY, EDIT_INVENTORY, GET_INVENTORY, POST_INVENTORY } from "./actionTypes";

export function* postInventorySaga({payload: {data, onHide}}) {
    try {
        const response = yield call(axios.post, URL_POST_INVENTORY, data)
        yield put(postInventorySuccess(response.data))
        yield put(inventory())
        yield call(onHide)
    } catch (err) {
        yield put(postInventoryFailed(err.response.message))
    }
}
export function* editInventorySaga({payload: {isbn, data, onHide}}) {
    try {
        const response = yield call(axios.post, URL_EDIT_INVENTORY.replace(':isbn', isbn), data)
        yield put(editInventorySuccess(response.data))
        yield put(inventory())
        yield call(onHide)
    } catch (err) {
        yield put(editInventoryFailed(err.response.message))
    }
}
export function* deleteInventorySaga({payload: {isbn, onHide}}) {
    try {
        const response = yield call(axios.delete, URL_DELETE_INVENTORY.replace(':isbn', isbn))
        yield put(deleteInventorySuccess(response.data))
        yield call(onHide)
        yield put(inventory())
    } catch (err) {
        //
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
    yield takeEvery(EDIT_INVENTORY, editInventorySaga),
    yield takeEvery(DELETE_INVENTORY, deleteInventorySaga)
}

export default inventorySaga
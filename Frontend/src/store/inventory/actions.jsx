import { EDIT_INVENTORY, EDIT_INVENTORY_FAILED, EDIT_INVENTORY_SUCCESS, GET_INVENTORY, GET_INVENTORY_FAILED, GET_INVENTORY_SUCCESS, POST_INVENTORY, POST_INVENTORY_SUCCESS } from "./actionTypes";

export const inventory = () => ({
    type: GET_INVENTORY,
    payload: null,
})

export const inventorySuccess = (respons) => ({
    type: GET_INVENTORY_SUCCESS,
    payload: respons
})

export const inventoryFailed = (message) => ({
    type: GET_INVENTORY_FAILED,
    payload: message
})

export const postInventory = (data, onHide) => ({
    type: POST_INVENTORY,
    payload: {data, onHide}
})
export const postInventorySuccess = () => ({
    type: POST_INVENTORY_SUCCESS,
    payload: null
})
export const postInventoryFailed = (message) => ({
    type: POST_INVENTORY,
    payload: message
})

export const editInventory = (isbn, data, onHide) => ({
    type: EDIT_INVENTORY,
    payload: {isbn, data, onHide}
})
export const editInventorySuccess = () => ({
    type: EDIT_INVENTORY_SUCCESS,
    payload: null
})
export const editInventoryFailed = (message) => ({
    type: EDIT_INVENTORY_FAILED,
    payload: message
})
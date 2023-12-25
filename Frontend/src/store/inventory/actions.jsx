import { CLEAR_INVENTORY_MESSAGE, DELETE_INVENTORY, DELETE_INVENTORY_FAILED, DELETE_INVENTORY_SUCCESS, EDIT_INVENTORY, EDIT_INVENTORY_FAILED, EDIT_INVENTORY_SUCCESS, GET_INVENTORY, GET_INVENTORY_FAILED, GET_INVENTORY_SUCCESS, POST_INVENTORY, POST_INVENTORY_SUCCESS } from "./actionTypes";

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
export const postInventorySuccess = (message) => ({
    type: POST_INVENTORY_SUCCESS,
    payload: message
})
export const postInventoryFailed = (message) => ({
    type: POST_INVENTORY,
    payload: message
})

export const editInventory = (isbn, data, onHide) => ({
    type: EDIT_INVENTORY,
    payload: {isbn, data, onHide}
})
export const editInventorySuccess = (message) => ({
    type: EDIT_INVENTORY_SUCCESS,
    payload: message
})
export const editInventoryFailed = (message) => ({
    type: EDIT_INVENTORY_FAILED,
    payload: message
})

export const deleteInventory = (isbn, onHide) => ({
    type: DELETE_INVENTORY,
    payload: {isbn, onHide}
})
export const deleteInventorySuccess = (message) => ({
    type: DELETE_INVENTORY_SUCCESS,
    payload: message
})
export const deleteInventoryFailed = (message) => ({
    type: DELETE_INVENTORY_FAILED,
    payload: message
})

export const clearIventoryMessage = () => ({
    type: CLEAR_INVENTORY_MESSAGE,
    payload: null
})
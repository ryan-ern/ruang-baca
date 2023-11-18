import { GET_INVENTORY, GET_INVENTORY_FAILED, GET_INVENTORY_SUCCESS } from "./actionTypes";

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
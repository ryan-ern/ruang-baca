import { GET_DASHBOARD, GET_DASHBOARD_FAILED, GET_DASHBOARD_SUCCESS, GET_WHATSAPP, GET_WHATSAPP_SUCCESS } from "./actionTypes";

export const dashboard = () => ({
    type: GET_DASHBOARD,
    payload: null
})

export const dashboardSuccess = (respons) => ({
    type: GET_DASHBOARD_SUCCESS,
    payload: respons,
})

export const dashboardFailed = (message) => ({
    type: GET_DASHBOARD_FAILED,
    payload: message
})


export const getWhatsapp = () => ({
    type: GET_WHATSAPP,
    payload: null
})

export const getWhatsappSuccess = (respons) => ({
    type: GET_WHATSAPP_SUCCESS,
    payload: respons
})
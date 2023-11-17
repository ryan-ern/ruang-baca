import { GET_DASHBOARD, GET_DASHBOARD_FAILED, GET_DASHBOARD_SUCCESS } from "./actionTypes";

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
import { DOWNLOAD_PRESENTS, DOWNLOAD_PRESENTS_FAILED, DOWNLOAD_PRESENTS_SUCCESS, GENERATE_BARCODE, GENERATE_BARCODE_FAILED, GENERATE_BARCODE_SUCCESS, GET_PRESENT, GET_PRESENT_FAILED, GET_PRESENT_SUCCESS, SCAN_BARCODE, SCAN_BARCODE_FAILED, SCAN_BARCODE_SUCCESS } from "./actionTypes";

export const generateBarcode = () => ({
    type: GENERATE_BARCODE,
    payload: null
})

export const generateBarcodeSuccess = (respons) => ({
    type: GENERATE_BARCODE_SUCCESS,
    payload: respons
})

export const generateBarcodeFailed = (message) => ({
    type: GENERATE_BARCODE_FAILED,
    payload: message
})

export const scanBarcode = (data) => ({
    type: SCAN_BARCODE,
    payload: { data }
})

export const scanBarcodeSuccess = (respons) => ({
    type: SCAN_BARCODE_SUCCESS,
    payload: respons
})

export const scanBarcodeFailed = (message) => ({
    type: SCAN_BARCODE_FAILED,
    payload: message
})

export const getPresent = () => ({
    type: GET_PRESENT,
    payload: null
})

export const getPresentSuccess = (respons) => ({
    type: GET_PRESENT_SUCCESS,
    payload: respons
})

export const getPresentFailed = (message) => ({
    type: GET_PRESENT_FAILED,
    payload: message
})

export const downloadPresent = (startDate, endDate) => ({
    type: DOWNLOAD_PRESENTS,
    payload: { startDate, endDate }
})

export const downloadPresentSuccess = (respons) => ({
    type: DOWNLOAD_PRESENTS_SUCCESS,
    payload: respons
})

export const downloadPresentFailed = (message) => ({
    type: DOWNLOAD_PRESENTS_FAILED,
    payload: message
})
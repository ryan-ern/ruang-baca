import {call, put, takeEvery} from 'redux-saga/effects'
import { URL_POST_LOGIN } from "../../../helper/urlHelper";
import axios from '../../../helper/apiHelper';


export function* LoginSaga({ payload: { account, navigate } }) {
    const body = account;
    try {
        const response = yield call (axios.post, URL_POST_LOGIN, body)
    }
}
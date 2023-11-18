import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import dashboardSaga from './dashboard/saga';
import inventoryReducer from './inventory/reducer';

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(dashboardSaga),
        fork(inventoryReducer)
    ]);
}
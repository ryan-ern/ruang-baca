import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import dashboardSaga from './dashboard/saga';
import inventorySaga from './inventory/saga';
import profilSaga from './profil/saga';

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(dashboardSaga),
        fork(inventorySaga),
        fork(profilSaga)
    ]);
}
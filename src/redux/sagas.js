import { put, takeEvery, fork } from 'redux-saga/effects';
import authFlowSaga from '../auth/auth.saga';
import reservationFlowSaga from '../reservation/reservation.saga';

function* sagaInit(action) {
  yield put({ type: 'SAGA_INIT', text: 'Welcome in BOOKit app from SAGA' });
}

function* initSaga() {
  yield takeEvery('REDUX_INIT', sagaInit);
}

export default function* rootSaga() {
  yield fork(initSaga);
  yield fork(authFlowSaga);
  yield fork(reservationFlowSaga);
}

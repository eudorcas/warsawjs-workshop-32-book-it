import { put, takeEvery, fork } from 'redux-saga/effects';
import authFlowSaga from '../auth/saga';
import bookingFlowSaga from '../booking/saga';

function* sagaInit(action) {
  yield put({ type: 'SAGA_INIT', text: 'Welcome in BOOKit app from SAGA' });
}

function* initSaga() {
  yield takeEvery('REDUX_INIT', sagaInit);
}

export default function* rootSaga() {
  yield fork(initSaga);
  yield fork(authFlowSaga);
  yield fork(bookingFlowSaga);
}

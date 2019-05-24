import { put, takeEvery, fork, take, call, cancel } from 'redux-saga/effects';
import { authFlow } from '../auth/auth.saga';
import * as api from '../api';

function* reservationApiCall(action) {
  try {
    yield call(api.reserveHotel);
    yield put({ type: 'RESERVATION_SUCCESS' });
  } catch (error) {
    yield put({ type: 'RESERVATION_ERROR', payload: { error } });
  }
}

function* reserveHotel(action) {
  const task = yield fork(reservationApiCall, action);
  const result = yield take([
    'RESERVATION_SUCCESS',
    'RESERVATION_ERROR',
    'CLOSE_SUMMARY',
  ]);
  if (result.type === 'CLOSE_SUMMARY') {
    yield cancel(task);
  }
}

function* reservationFlow() {
  const hasAuth = yield call(authFlow);
  if (hasAuth) {
    yield put({ type: 'RESERVE_HOTEL' });
  }
}

export default function* watchPurchaseFlow() {
  yield takeEvery('COMPLETE_RESERVATION', reservationFlow);
  yield takeEvery('RESERVE_HOTEL', reserveHotel);
}

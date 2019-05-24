import { put, takeEvery, fork, take, call, cancel } from 'redux-saga/effects';
import { authFlow } from '../auth/auth.saga';

export const delay = ms =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));

const random_boolean = () => Math.random() >= 0.5;

function isReservationCorrect() {
  return new Promise((resolve, reject) => {
    if (random_boolean()) {
      resolve(true);
    }
    reject('Ktoś Cię uprzedził, wybierz inny hotel i spróbuj ponownie.');
  });
}

function* reservationApiCall(action) {
  try {
    yield delay(1500);
    yield call(isReservationCorrect);
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
  // execute the auth flow
  // `call` is the command to call other sagas
  const hasAuth = yield call(authFlow);
  if (hasAuth) {
    // dispatch an action that will actually make the request
    yield put({ type: 'RESERVE_HOTEL' });
  }
}

export default function* watchPurchaseFlow() {
  yield takeEvery('COMPLETE_RESERVATION', reservationFlow);
  yield takeEvery('RESERVE_HOTEL', reserveHotel);
}

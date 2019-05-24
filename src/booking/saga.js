import { put, takeEvery, fork, take, call, cancel } from 'redux-saga/effects';
import { authFlow } from '../auth/saga';
import * as api from '../api';

function* bookingApiCall(action) {
  try {
    yield call(api.reserveHotel);
    yield put({ type: 'BOOK_SUCCESS' });
  } catch (error) {
    yield put({ type: 'BOOK_ERROR', payload: { error } });
  }
}

function* reserveHotel(action) {
  const task = yield fork(bookingApiCall, action);
  const result = yield take(['BOOK_SUCCESS', 'BOOK_ERROR', 'CLOSE_SUMMARY']);
  if (result.type === 'CLOSE_SUMMARY') {
    yield cancel(task);
  }
}

function* bookingFlow(action) {
  const hasAuth = yield call(authFlow);
  if (hasAuth) {
    yield put({ type: 'BOOK_HOTEL', payload: action.payload });
  }
}

export default function* watchPurchaseFlow() {
  yield takeEvery('COMPLETE_RESERVATION', bookingFlow);
  yield takeEvery('BOOK_HOTEL', reserveHotel);
}

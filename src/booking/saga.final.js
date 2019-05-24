import { put, takeEvery, fork, take, call, cancel } from 'redux-saga/effects';
import { authFlow } from '../auth/saga';
import * as api from '../api';

import { bookSuccess, bookError, bookHotel } from './reducers';
function* bookingApiCall(action) {
  try {
    yield call(api.reserveHotel);
    yield put(bookSuccess());
  } catch (error) {
    yield put(bookError(error));
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
    yield put(bookHotel(action.payload));
  }
}

export default function* watchPurchaseFlow() {
  yield takeEvery('COMPLETE_BOOKING', bookingFlow);
  yield takeEvery('BOOK_HOTEL', reserveHotel);
}

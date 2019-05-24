import { put, takeEvery, fork, take, call, cancel } from 'redux-saga/effects';
import { authFlow } from '../auth/saga';
import * as api from '../api';

import { bookSuccess, bookError, bookHotel } from './reducers';

export default function* watchPurchaseFlow() {}

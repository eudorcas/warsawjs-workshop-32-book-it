import {
  put,
  takeEvery,
  fork,
  take,
  call,
  cancel,
  select,
} from 'redux-saga/effects';
import { loginSuccess, loginError, openAuthModal } from './auth.reducer';
import { isAuthenticated } from './auth.selector';

export const delay = ms =>
  new Promise(resolve => setTimeout(() => resolve(true), ms));

function isPasswordCorrect(password) {
  return new Promise((resolve, reject) => {
    if (password === 'admin') {
      resolve(true);
    }
    reject('Prawidłowe hasło to `admin`');
  });
}

function* loginApiCall(action) {
  try {
    const { nick, password } = action.payload;
    yield delay(1500);
    yield call(isPasswordCorrect, password);
    yield put(loginSuccess(nick));
  } catch (e) {
    yield put(loginError(e));
  }
}
function* login(action) {
  const task = yield fork(loginApiCall, action);
  const result = yield take([
    'LOGIN_SUCCESS',
    'LOGIN_ERROR',
    'CLOSE_AUTH_MODAL',
  ]);
  if (result.type === 'CLOSE_AUTH_MODAL') {
    yield cancel(task);
  }
}

export function* authFlow() {
  const isAuth = yield select(isAuthenticated);
  if (isAuth) {
    return true;
  }
  yield put(openAuthModal());
  const result = yield take(['LOGIN_SUCCESS', 'CLOSE_AUTH_MODAL']);
  if (result.type === 'LOGIN_SUCCESS') {
    return true;
  } else {
    return;
  }
}

function* authFlowSaga() {
  yield takeEvery('MANUAL_LOGIN', authFlow);
  yield takeEvery('LOGIN_USER', login);
}

export default authFlowSaga;

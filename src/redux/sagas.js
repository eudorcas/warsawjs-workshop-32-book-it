import { put, takeEvery } from 'redux-saga/effects';

function* sagaInit(action) {
  yield put({ type: 'SAGA_INIT', text: 'Welcome in BOOKit app from SAGA' });
}

function* mySaga() {
  yield takeEvery('REDUX_INIT', sagaInit);
}

export default mySaga;

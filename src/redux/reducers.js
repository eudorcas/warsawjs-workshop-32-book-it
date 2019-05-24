import { combineReducers } from 'redux';
import auth from '../auth/auth.reducer';

function root(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({ root, auth });

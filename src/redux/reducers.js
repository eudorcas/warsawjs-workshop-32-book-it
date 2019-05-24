import { combineReducers } from 'redux';
import auth from '../auth/reducers';
import booking from '../booking/reducers';
import ratings from '../rating/reducers';

function root(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({ root, auth, booking, ratings });

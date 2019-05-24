const initState = {
  isAuth: false,
  authModal: false,
  nick: null,
  error: null,
  inProgress: false,
};

function auth(state = initState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuth: true,
        nick: action.payload.nick,
        authModal: false,
        error: null,
        inProgress: false,
      };
    case 'LOGOUT_USER':
      return {
        ...initState,
      };

    case 'LOGIN_USER':
      return {
        ...state,
        inProgress: true,
      };
    case 'OPEN_AUTH_MODAL':
      return {
        ...state,

        authModal: true,
      };
    case 'CLOSE_AUTH_MODAL':
      return {
        ...state,
        authModal: false,
        error: null,
        inProgress: false,
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        inProgress: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
export function openAuthModal() {
  return { type: 'OPEN_AUTH_MODAL' };
}
export function closeAuthModal() {
  return { type: 'CLOSE_AUTH_MODAL' };
}

export function loginUser(nick, password) {
  return { type: 'LOGIN_USER', payload: { nick, password } };
}

export function logoutUser() {
  return { type: 'LOGOUT_USER' };
}

export function startManualLogin() {
  return { type: 'MANUAL_LOGIN' };
}

export function loginSuccess(nick) {
  return { type: 'LOGIN_SUCCESS', payload: { nick } };
}

export function loginError(error) {
  return { type: 'LOGIN_ERROR', payload: { error } };
}

export default auth;

export function isAuthenticated(state) {
  return state.auth.isAuth;
}

export function isModalOpen(state) {
  return state.auth.authModal;
}

export function getUserNick(state) {
  return state.auth.nick;
}
export function getAuthError(state) {
  return state.auth.error;
}

export function isLoginInProgress(state) {
  return state.auth.inProgress;
}

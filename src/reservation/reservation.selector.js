export function getReservationError(state) {
  return state.reservation.error;
}

export function isReservationInProgress(state) {
  return state.reservation.inProgress;
}
export function isReservationComplete(state) {
  return state.reservation.isComplete;
}

export function isReservationSuccess(state) {
  return state.reservation.isComplete && !state.reservation.error;
}

export function isReservationFailure(state) {
  return !!state.reservation.error;
}

export function getBookingError(state) {
  return state.booking.error;
}

export function isBookingInProgress(state) {
  return state.booking.inProgress;
}
export function isBookingComplete(state) {
  return state.booking.isComplete;
}

export function isBookingSuccess(state) {
  return state.booking.isComplete && !state.booking.error;
}

export function isBookingFailure(state) {
  return !!state.booking.error;
}

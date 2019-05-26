const initState = {
  error: null,
  isComplete: false,
  inProgress: false,
};

function booking(state = initState, action) {
  switch (action.type) {
    case 'BOOK_HOTEL':
      return {
        ...state,
        inProgress: true,
      };
    case 'BOOK_SUCCESS':
      return {
        ...state,
        error: null,
        inProgress: false,
        isComplete: true,
      };
    case 'BOOK_ERROR':
      return {
        ...state,
        inProgress: false,
        error: action.payload.error,
      };
    case 'CLOSE_SUMMARY':
      return {
        ...initState,
      };
    default:
      return state;
  }
}
export function closeSummary() {
  return { type: 'CLOSE_SUMMARY' };
}

export function bookError(error) {
  return { type: 'BOOK_ERROR', payload: { error } };
}

export function bookSuccess() {
  return { type: 'BOOK_SUCCESS' };
}

export function bookHotel(info) {
  return { type: 'BOOK_HOTEL', payload: info };
}

export function completeBooking(info) {
  return { type: 'COMPLETE_BOOKING', payload: info };
}

export default booking;

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
        isComplete: true,
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
export function loginError(error) {
  return { type: 'LOGIN_ERROR', payload: { error } };
}

export default booking;

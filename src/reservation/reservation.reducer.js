const initState = {
  error: null,
  isComplete: false,
  inProgress: false,
};

function reservation(state = initState, action) {
  switch (action.type) {
    case 'RESERVE_HOTEL':
      return {
        ...state,
        inProgress: true,
      };
    case 'RESERVATION_SUCCESS':
      return {
        ...state,
        error: null,
        inProgress: false,
        isComplete: true,
      };
    case 'RESERVATION_ERROR':
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

export default reservation;

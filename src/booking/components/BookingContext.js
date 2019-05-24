import React, { useReducer, createContext } from 'react';
import { Segment } from 'semantic-ui-react';
import BookingCompletionStatus from './BookingCompletionStatus';

const BookingContext = createContext(null);

const initialState = { step: 1, hotel: null, paymentMethod: null };

function init(initialState) {
  return { ...initialState };
}

function reducer(state, action) {
  switch (action.type) {
    case 'hotel':
      const { hotel } = action.payload;
      return { ...state, step: 2, hotel };
    case 'paymentMethod':
      const { method } = action.payload;
      return { ...state, step: 3, paymentMethod: method };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}
export function useBookingFlow() {
  const context = React.useContext(BookingContext);

  if (!context) {
    throw new Error('useBookingFlow must be used within a BookingFlow');
  }

  const { state, dispatch } = context;

  const selectHotel = hotel => dispatch({ type: 'hotel', payload: { hotel } });
  const selectPaymentMethod = method =>
    dispatch({ type: 'paymentMethod', payload: { method } });
  const reset = () => dispatch({ type: 'reset', payload: initialState });

  return { state, selectHotel, selectPaymentMethod, reset };
}

export function BookingFlow({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const context = { state, dispatch };
  return (
    <BookingContext.Provider value={context}>
      <Segment vertical style={{ padding: '2em 0em' }}>
        <BookingCompletionStatus step={state.step} />
      </Segment>
      <Segment vertical style={{ padding: '2em 0em' }}>
        {children[state.step - 1]}
      </Segment>
    </BookingContext.Provider>
  );
}

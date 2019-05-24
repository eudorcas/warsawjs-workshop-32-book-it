import React, { useReducer, createContext } from 'react';
import { Segment } from 'semantic-ui-react';
import { Router } from '@reach/router';

import Footer from './Footer';
import HotelsList from './HotelsList';
import MenuBar from './MenuBar';
import ReservationSteps from './ReservationSteps';
import { SelectPaymentMethod } from './SelectPaymentMethod';
import ReservationSummary from './ReservationSummary';
import LoginModal from '../auth/LoginModal';
import Rating from './Rating';

export const StepsContext = createContext(null);

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
export function StepsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const selectHotel = hotel => dispatch({ type: 'hotel', payload: { hotel } });
  const selectPaymentMethod = method =>
    dispatch({ type: 'paymentMethod', payload: { method } });
  const reset = () => dispatch({ type: 'reset', payload: initialState });

  const context = {
    state,
    actions: { selectHotel, selectPaymentMethod, reset },
  };
  return (
    <StepsContext.Provider value={context}>
      <Segment vertical style={{ padding: '2em 0em' }}>
        <ReservationSteps step={state.step} />
      </Segment>
      <Segment vertical style={{ padding: '2em 0em' }}>
        {children[state.step - 1]}
      </Segment>
    </StepsContext.Provider>
  );
}
const Home = () => (
  <StepsProvider>
    <HotelsList />
    <SelectPaymentMethod />
    <ReservationSummary />
  </StepsProvider>
);
const RatingScreen = () => <Rating />;
const App = () => {
  return (
    <>
      <LoginModal />
      <MenuBar />
      <Router>
        <Home path="/" />
        <RatingScreen path="rating" />
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;

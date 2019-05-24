import React, { useReducer } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import Footer from './Footer';
import HotelsList from './HotelsList';
import MenuBar from './MenuBar';
import ReservationSteps from './ReservationSteps';
import { SelectPaymentMethod } from './SelectPaymentMethod';
import { ReservationSummary } from './ReservationSummary';

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
const Pack = ({ children, text }) => (
  <Segment vertical style={{ padding: '2em 0em' }}>
    <Container text={text}>{children}</Container>
  </Segment>
);
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const selectHotelDispatch = hotel =>
    dispatch({ type: 'hotel', payload: { hotel } });
  const selectPaymentMethodDispatch = method =>
    dispatch({ type: 'paymentMethod', payload: { method } });
  const resetReservationDispatch = () =>
    dispatch({ type: 'reset', payload: initialState });
  return (
    <>
      <MenuBar />
      {state.step > 1 && (
        <Pack>
          <ReservationSteps step={state.step} />
        </Pack>
      )}
      {state.step === 1 && (
        <Pack>
          <HotelsList selectHotel={selectHotelDispatch} />
        </Pack>
      )}
      {state.step === 2 && (
        <Pack text>
          <SelectPaymentMethod
            selectPaymentMethod={selectPaymentMethodDispatch}
            reset={resetReservationDispatch}
            hotel={state.hotel}
          />
        </Pack>
      )}
      {state.step === 3 && (
        <Pack text>
          <ReservationSummary
            reset={resetReservationDispatch}
            paymentMethod={state.paymentMethod}
            hotel={state.hotel}
          />
        </Pack>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default App;

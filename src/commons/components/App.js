import React from 'react';
import { Router } from '@reach/router';

import MenuBar from './MenuBar';
import SelectHotel from '../../booking/components/SelectHotel';
import SelectPaymentMethod from '../../booking/components/SelectPaymentMethod';
import ConfirmBooking from '../../booking/components/ConfirmBooking';
import { BookingFlow } from '../../booking/components/BookingContext';
import LoginModal from '../../auth/components/LoginModal';
import RatePastVisits from '../../rating/components/RatePastVisits';

const App = () => {
  return (
    <>
      <LoginModal />
      <MenuBar />
      <Router>
        <Home path="/" />
        <RateScreen path="rate" />
      </Router>
    </>
  );
};

const Home = () => (
  <BookingFlow>
    <SelectHotel />
    <SelectPaymentMethod />
    <ConfirmBooking />
  </BookingFlow>
);
const RateScreen = () => <RatePastVisits />;

export default App;

import React from 'react';
import { Router } from '@reach/router';

import MenuBar from './MenuBar';
import LoginModal from '../../auth/components/LoginModal';
import RatePastVisits from '../../rating/components/RatePastVisits';
import BookingFlow from '../../booking/components/BookingFlow';

const App = () => {
  return (
    <>
      <LoginModal />
      <MenuBar />
      <Router>
        <HomeScreen path="/" />
        <RateScreen path="rate" />
      </Router>
    </>
  );
};

const HomeScreen = () => <BookingFlow />;
const RateScreen = () => <RatePastVisits />;

export default App;

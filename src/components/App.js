import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import Footer from './Footer';
import HotelsList from './HotelsList';
import MenuBar from './MenuBar';
import ReservationSteps from './ReservationSteps';
import { SelectPaymentMethod } from './SelectPaymentMethod';
import { ReservationSummary } from './ReservationSummary';

import data from '../data.json';
export const item = data.list[0];

const App = () => (
  <>
    <MenuBar />

    <Segment vertical style={{ padding: '2em 0em' }}>
      <Container>
        <HotelsList />
      </Container>
    </Segment>
    <Segment vertical style={{ padding: '2em 0em' }}>
      <Container>
        <ReservationSteps />
      </Container>
    </Segment>
    <Segment vertical style={{ padding: '2em 0em' }}>
      <Container text>
        <SelectPaymentMethod />
      </Container>
    </Segment>
    <Segment vertical style={{ padding: '2em 0em' }}>
      <Container text>
        <ReservationSummary />
      </Container>
    </Segment>
    <Footer />
  </>
);

export default App;

import React from 'react';
import { Segment } from 'semantic-ui-react';
import SelectHotel from './SelectHotel';

import SelectPaymentMethod from './SelectPaymentMethod';
import ConfirmBooking from './ConfirmBooking';
import BookingCompletionStatus from './BookingCompletionStatus';

const BookingFlow = () => {
  const step = 1;
  return (
    <>
      <Section>
        <BookingCompletionStatus step={step} />
      </Section>
      <Section>
        {step === 1 && <SelectHotel />}
        {step === 2 && <SelectPaymentMethod />}
        {step === 3 && <ConfirmBooking />}
      </Section>
    </>
  );
};
const Section = ({ children }) => {
  return (
    <Segment vertical style={{ padding: '2em 0em' }}>
      {children}
    </Segment>
  );
};

export default BookingFlow;

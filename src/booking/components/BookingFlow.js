import React from 'react';
import SelectHotel from './SelectHotel';
import SelectPaymentMethod from './SelectPaymentMethod';
import ConfirmBooking from './ConfirmBooking';
import { BookingFlowProvider } from './BookingContext';

const BookingFlow = () => (
  <BookingFlowProvider>
    <SelectHotel />
    <SelectPaymentMethod />
    <ConfirmBooking />
  </BookingFlowProvider>
);
export default BookingFlow;

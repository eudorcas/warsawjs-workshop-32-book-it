import React from 'react';
import SelectHotel from './SelectHotel.final';
import SelectPaymentMethod from './SelectPaymentMethod.final';
import ConfirmBooking from './ConfirmBooking.final';
import { BookingFlowProvider } from './BookingContext';

const BookingFlow = () => (
  <BookingFlowProvider>
    <SelectHotel />
    <SelectPaymentMethod />
    <ConfirmBooking />
  </BookingFlowProvider>
);
export default BookingFlow;

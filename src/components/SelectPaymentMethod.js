import React, { useContext } from 'react';
import {
  Button,
  Divider,
  Header,
  Dropdown,
  Container,
} from 'semantic-ui-react';
import { HotelCard } from './HotelSummary';
import { StepsContext } from './App';

export const paymentsOptions = [
  {
    key: 'blik',
    text: 'BLIK',
    value: 'blik',
  },
  {
    key: 'paypal',
    text: 'PayPal',
    value: 'paypal',
  },
  {
    key: 'card',
    text: 'Karta Kredytowa',
    value: 'card',
  },
];

export const SelectPaymentMethod = () => {
  const {
    state: { hotel },
    actions: { reset, selectPaymentMethod },
  } = useContext(StepsContext);
  return (
    <Container text>
      <HotelCard hotel={hotel} />
      <Header as="h3">Wybierz formę płatności:</Header>
      <Dropdown
        placeholder="forma płatności..."
        onChange={(e, { value }) => selectPaymentMethod(value)}
        fluid
        selection
        options={paymentsOptions}
      />
      <Divider hidden />
      <Button onClick={() => reset()}>Przerwij</Button>
    </Container>
  );
};

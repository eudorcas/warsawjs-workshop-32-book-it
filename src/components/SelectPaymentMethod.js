import React from 'react';
import { Button, Divider, Header, Dropdown } from 'semantic-ui-react';
import { HotelCard } from './HotelSummary';

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

export class SelectPaymentMethod extends React.Component {
  render() {
    const { hotel, reset, selectPaymentMethod } = this.props;
    return (
      <>
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
      </>
    );
  }
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Divider,
  Header,
  Dropdown,
  Container,
} from 'semantic-ui-react';
import HotelsList from './HotelsList';
import { useBookingFlow } from './BookingContext';

import usePersistsValue from '../../utils/usePersistsValue';

const SelectPaymentMethod = () => {
  const {
    state: { hotel },
    reset,
    selectPaymentMethod,
  } = useBookingFlow();
  const [preferred, setPreferred] = usePersistsValue('preferredMethod', null);
  const [value, setValue] = useState(preferred);
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setPreferred(value);
    }
  }, [value, setPreferred]);

  return (
    <Container text>
      <HotelsList hotels={[hotel]} />
      <Header as="h3">Wybierz formę płatności:</Header>
      <Dropdown
        placeholder="forma płatności..."
        onChange={(e, { value }) => setValue(value)}
        fluid
        value={value}
        selection
        options={paymentsOptions}
      />
      <Divider hidden />
      <Button
        disabled={!value}
        onClick={() => selectPaymentMethod(value)}
        primary
        floated="right"
      >
        Wybierz
      </Button>
      <Button onClick={() => reset()}>Powrót do listy hoteli</Button>
    </Container>
  );
};

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
export default SelectPaymentMethod;

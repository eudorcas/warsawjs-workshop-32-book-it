import React, { useContext } from 'react';
import { Button, Table, Divider, Container } from 'semantic-ui-react';
import { HotelCard } from './HotelSummary';
import { StepsContext } from './App';

export const ReservationSummary = () => {
  const {
    state: { hotel, paymentMethod },
    actions: { reset },
  } = useContext(StepsContext);
  return (
    <Container text>
      <HotelCard hotel={hotel} />
      <Table basic="very">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Forma płatności</Table.Cell>
            <Table.Cell collapsing textAlign="right">
              {paymentMethod}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cena z pokój</Table.Cell>
            <Table.Cell collapsing textAlign="right">
              {hotel.price.amount} {hotel.price.currency}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Podatek VAT 8%</Table.Cell>
            <Table.Cell collapsing textAlign="right">
              + {+hotel.price.amount * 0.08} zł
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <strong>Suma</strong>
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
              <strong>
                + {+hotel.price.amount + +hotel.price.amount * 0.08} zł
              </strong>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button primary floated="right">
        Zarezerwuj
      </Button>
      <Button onClick={() => reset()} floated="left">
        Przerwij
      </Button>
      <Divider hidden fitted clearing />
    </Container>
  );
};

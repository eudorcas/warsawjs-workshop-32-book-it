import React from 'react';
import { Button, Table, Divider } from 'semantic-ui-react';
import { HotelCard } from './HotelCard';

export class ReservationSummary extends React.Component {
  render() {
    const { hotel, paymentMethod, reset } = this.props;
    return (
      <div>
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
                + 134 zł
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <strong>Suma</strong>
              </Table.Cell>
              <Table.Cell collapsing textAlign="right">
                <strong>+ {+hotel.price.amount + 134} zł</strong>
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
      </div>
    );
  }
}

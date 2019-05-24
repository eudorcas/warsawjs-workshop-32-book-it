import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import data from '../data.json';
export const item = data.list[0];

export class ReservationSummary extends React.Component {
  render() {
    return (
      <div>
        <Table basic="very">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Forma płatności</Table.Cell>
              <Table.Cell collapsing textAlign="right">
                BLIK
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cena z pokój</Table.Cell>
              <Table.Cell collapsing textAlign="right">
                {item.price.amount} {item.price.currency}
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
                <strong>+ {+item.price.amount + 134} zł</strong>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button primary>Zarezerwuj</Button>
      </div>
    );
  }
}

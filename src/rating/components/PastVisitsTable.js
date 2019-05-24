import React from 'react';
import { Table } from 'semantic-ui-react';

const PastVisitsTable = props => (
  <Table basic="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Hotel</Table.HeaderCell>
        <Table.HeaderCell singleLine>Średnia ocena</Table.HeaderCell>
        <Table.HeaderCell singleLine>Twoja ocena</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>{props.children}</Table.Body>
  </Table>
);
export default PastVisitsTable;

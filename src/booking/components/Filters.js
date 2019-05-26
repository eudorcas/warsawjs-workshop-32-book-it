import React from 'react';
import { Header, Divider, Checkbox } from 'semantic-ui-react';
import { BEDS_TYPE } from '../../utils/const';

const Filters = ({ count, onChange }) => (
  <>
    <Header as="h4">Filtruj według następujących kryteriów:</Header>
    <Divider />
    <Header as="h5">Rodzaj łóżka</Header>
    {BEDS_TYPE.map(b => (
      <div key={b.value}>
        <Checkbox
          onChange={(e, { value, checked }) => onChange(value, checked)}
          value={b.value}
          label={b.text}
        />{' '}
        ({count[b.value]})
      </div>
    ))}
  </>
);

export default React.memo(Filters);

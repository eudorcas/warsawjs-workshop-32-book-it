import React from 'react';
import { Header, Divider, Checkbox } from 'semantic-ui-react';
import { bedsType } from './HotelsList';

export class Filters extends React.PureComponent {
  render() {
    const { count, onChange } = this.props;
    return (
      <>
        <Header as="h4">Filtruj według następujących kryteriów:</Header>
        <Divider />
        <Header as="h5">Rodzaj łóżka</Header>
        {bedsType.map(b => (
          <div key={b.value}>
            <Checkbox
              onChange={(e, { value, checked }) => onChange(value, checked)}
              value={b.value}
              label={b.text}
            />{' '}
            ({count[b.text]})
          </div>
        ))}
      </>
    );
  }
}

import React from 'react';
import { Header, Checkbox } from 'semantic-ui-react';
import { bedsType } from './HotelsList';

export class Filters extends React.PureComponent {
  render() {
    return (
      <>
        <Header as="h4">Filtruj według następujących kryteriów:</Header>
        <Header as="h5">Rodzaj łóżka</Header>
        {bedsType.map(b => (
          <div key={b.value}>
            <Checkbox
              onChange={(e, { value, checked }) =>
                this.props.onChange(value, checked)
              }
              value={b.value}
              label={b.text}
            />
          </div>
        ))}
      </>
    );
  }
}

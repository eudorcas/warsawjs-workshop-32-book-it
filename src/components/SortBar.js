import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { sortFields } from './HotelsList';

export class SortBar extends React.PureComponent {
  render() {
    return (
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item>Sortuj według:</Menu.Item>
          {sortFields.map(f => (
            <Menu.Item
              key={f.value}
              onClick={() => this.props.setField(f.value)}
              as="a"
            >
              {f.value === this.props.sortField && <Icon name="filter" />}
              {f.text}
            </Menu.Item>
          ))}
        </Menu.Menu>
      </Menu>
    );
  }
}

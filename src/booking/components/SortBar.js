import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

const SortBar = ({ setField, sortField }) => (
  <Menu secondary>
    <Menu.Menu position="right">
      <Menu.Item>Sortuj według:</Menu.Item>
      {sortFields.map(f => (
        <Menu.Item key={f.value} onClick={() => setField(f.value)} as="a">
          {f.value === sortField && <Icon name="filter" />}
          {f.text}
        </Menu.Item>
      ))}
    </Menu.Menu>
  </Menu>
);
export default SortBar;

const sortFields = [
  {
    text: 'ilość opinii',
    value: 'reviews',
  },
  {
    text: 'ocena gości',
    value: 'rating',
  },
  {
    text: 'cena',
    value: 'price',
  },
];

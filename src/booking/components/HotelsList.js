import React from 'react';
import { Item } from 'semantic-ui-react';
import HotelCard from './HotelCard';

const HotelsList = ({ hotels, selectHotel }) => (
  <Item.Group divided>
    {hotels.map(hotel => (
      <HotelCard key={hotel.id} hotel={hotel} selectHotel={selectHotel} />
    ))}
  </Item.Group>
);

export default React.memo(HotelsList);

import React, { useState, useCallback } from 'react';
import { Item, Grid } from 'semantic-ui-react';

import data from '../data.json';
import { Filters } from './Filters';
import { SortBar } from './SortBar';
import { HotelCard } from './HotelCard';

export const sortFields = [
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

const sortHotels = {
  price: (a, b) => a.price.amount - b.price.amount,
  rating: (a, b) => b.rating.average - a.rating.average,
  reviews: (a, b) => b.rating.reviews - a.rating.reviews,
};

export const bedsType = [
  {
    text: 'Single',
    value: 'single',
  },
  {
    text: 'Double',
    value: 'double',
  },
  {
    text: 'Twin',
    value: 'twin',
  },
];
const countHotelsByBedType = data =>
  data.reduce(function(acc, v) {
    acc[v.room] = acc[v.room] ? acc[v.room] + 1 : 1;
    return acc;
  }, {});

const applyFilter = (filters, data) => {
  const isFilterSet = bedsType.find(b => filters[b.value]);
  if (!isFilterSet) {
    return data;
  }
  const filteredHotels = data.filter(h => filters[h.room.toLowerCase()]);
  return filteredHotels;
};

const HotelsList = ({ selectHotel }) => {
  const [sortField, setField] = useState('price');
  const [bedsTypeFilter, setBedType] = useState({});

  const setBedTypeFilter = useCallback(
    (value, checked) =>
      setBedType({
        ...bedsTypeFilter,
        [value]: checked,
      }),
    [bedsTypeFilter]
  );
  const sortedHotels = data.list.sort(sortHotels[sortField]);
  const filteredHotels = applyFilter(bedsTypeFilter, sortedHotels);

  return (
    <>
      <SortBar sortField={sortField} setField={setField} />
      <Layout>
        <Layout.Sidebar>
          <Filters onChange={setBedTypeFilter} />
        </Layout.Sidebar>
        <Layout.Feed>
          {filteredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} selectHotel={selectHotel} />
          ))}
        </Layout.Feed>
      </Layout>
    </>
  );
};

const Layout = ({ children }) => (
  <Grid stackable divided>
    <Grid.Row>{children}</Grid.Row>
  </Grid>
);
const Sidebar = ({ children }) => (
  <Grid.Column width={4}>{children}</Grid.Column>
);

const Feed = ({ children }) => (
  <Grid.Column width={12}>
    <Item.Group divided>{children}</Item.Group>
  </Grid.Column>
);

Layout.Sidebar = Sidebar;
Layout.Feed = Feed;

export default HotelsList;

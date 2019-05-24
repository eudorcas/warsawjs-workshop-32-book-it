import React, { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Grid, Loader, Container, Checkbox } from 'semantic-ui-react';

import Filters from './Filters';
import SortBar from './SortBar';
import HotelsList from './HotelsList';
import { useBookingFlow } from './BookingContext';
import lazyWithPreload from '../../utils/lazyWithPreload';

const sortHotels = {
  price: (a, b) => a.price.amount - b.price.amount,
  rating: (a, b) => b.rating.average - a.rating.average,
  reviews: (a, b) => b.rating.reviews - a.rating.reviews,
};

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

const RatingChart = lazyWithPreload(() => import('./RatingChart'));

const SelectHotel = props => {
  const [sortField, setField] = useState('price');
  const [bedsTypeFilter, setBedType] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChartVisible, setChartVisible] = useState(false);
  const { selectHotel } = useBookingFlow();
  useEffect(() => {
    const fetchData = async () => {
      RatingChart.preload();
      setIsLoading(true);
      const result = await axios(process.env.PUBLIC_URL + '/data.json');
      setIsLoading(false);
      setData(result.data.list);
    };
    fetchData();
  }, []);

  const setBedTypeFilter = useCallback(
    (value, checked) =>
      setBedType({
        ...bedsTypeFilter,
        [value]: checked,
      }),
    [bedsTypeFilter]
  );
  const hotelsInFilter = useMemo(() => countHotelsByBedType(data), [data]);
  const sortedHotels = data.sort(sortHotels[sortField]);
  const filteredHotels = applyFilter(bedsTypeFilter, sortedHotels);
  const chartData = filteredHotels.map(h => ({
    rating: h.rating.average,
    price: h.price.amount,
    reviews: h.rating.reviews,
    name: h.title,
  }));
  return (
    <Container>
      <SortBar sortField={sortField} setField={setField} />
      <Layout>
        <Layout.Sidebar>
          <Checkbox
            checked={isChartVisible}
            onChange={() => setChartVisible(!isChartVisible)}
            toggle
            label="Pokaż wykres"
          />
          <Filters count={hotelsInFilter} onChange={setBedTypeFilter} />
        </Layout.Sidebar>
        <Layout.Feed isLoading={isLoading}>
          {isChartVisible && (
            <React.Suspense fallback={<Loader active inline="centered" />}>
              <RatingChart data={chartData} />
            </React.Suspense>
          )}
          <HotelsList hotels={filteredHotels} selectHotel={selectHotel} />
        </Layout.Feed>
      </Layout>
    </Container>
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

const Feed = ({ isLoading, children }) => (
  <Grid.Column width={12}>
    {isLoading ? <Loader active inline="centered" /> : children}
  </Grid.Column>
);

Layout.Sidebar = Sidebar;
Layout.Feed = Feed;

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

export default SelectHotel;

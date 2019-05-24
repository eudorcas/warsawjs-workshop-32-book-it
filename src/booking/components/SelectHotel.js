import React, { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Grid, Loader, Container, Checkbox } from 'semantic-ui-react';

import Filters from './Filters';
import SortBar from './SortBar';
import HotelsList from './HotelsList';
import { useBookingFlow } from './BookingContext';
import lazyWithPreload from '../../utils/lazyWithPreload';
import { ONLINE_URL, BEDS_TYPE } from '../../utils/const';

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
  const isFilterSet = BEDS_TYPE.find(b => filters[b.value]);
  if (!isFilterSet) {
    return data;
  }
  const filtered = data.filter(h => filters[h.room]);
  return filtered;
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
      const result = await axios(ONLINE_URL);
      setIsLoading(false);
      setData(result.data.list.slice(0, 20));
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
  const filteredHotels = useMemo(() => applyFilter(bedsTypeFilter, data), [
    bedsTypeFilter,
    data,
  ]);
  const sortedHotels = useMemo(
    () => filteredHotels.sort(sortHotels[sortField]).concat([]),
    [filteredHotels, sortField]
  );

  const chartData = useMemo(
    () =>
      filteredHotels.map(h => ({
        rating: h.rating.average,
        price: h.price.amount,
        reviews: h.rating.reviews,
        name: h.title,
      })),
    [filteredHotels]
  );
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
          {isLoading ? (
            <Loader active inline="centered" />
          ) : (
            <HotelsList hotels={sortedHotels} selectHotel={selectHotel} />
          )}
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

const Feed = ({ children }) => <Grid.Column width={12}>{children}</Grid.Column>;

Layout.Sidebar = Sidebar;
Layout.Feed = Feed;

export default SelectHotel;

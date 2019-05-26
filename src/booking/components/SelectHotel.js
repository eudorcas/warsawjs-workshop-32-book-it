import React, { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Grid, Loader, Container } from 'semantic-ui-react';

import Filters from './Filters';
import SortBar from './SortBar';
import HotelsList from './HotelsList';
import ChartSwitcher from './ChartSwitcher';

import { ONLINE_URL, BEDS_TYPE } from '../../utils/const';

const RatingChart = React.lazy(() => import('./RatingChart'));

const SelectHotel = props => {
  const [hotels, setData] = useState([]);
  const [isLoading, setLoading] = useState();
  const [bedType, setBedType] = useState({});
  const [sortType, setSortType] = useState('price');
  const [showChart, setSwitcher] = useState(false);

  const setFilter = useCallback(
    (filterType, checked) => 
    setBedType({
      ...bedType,
      [filterType]: checked
    }), [bedType]);
  
  
  const filteredHotels = useMemo(() => applyFilter(bedType, hotels), [bedType, hotels]);
  const sortedHotels = useMemo(() => applySort(filteredHotels, sortType), [filteredHotels, sortType]);
  const hotelsInFilter = useMemo(() => countHotelsByBedType(hotels), [hotels]);
  const chartData = useMemo(() => prepareChartData(sortedHotels),
    [sortedHotels]
  );

  useEffect(() => {
    setLoading(true);
    fetch(ONLINE_URL)
    .then(response =>response.json())
    .then(data => {
      setData(data.list);
      setLoading(false);
    });
  },[]);

  
  return (
    <Container>
      <h1>Siema</h1>
      <SortBar sortField={sortType} setField={setSortType} />
      <Layout>
        <Layout.Sidebar>
          <ChartSwitcher isChartVisible={showChart} switchChartVisible={setSwitcher} />
          <Filters count={hotelsInFilter} onChange={setFilter}></Filters>
        </Layout.Sidebar>
        <Layout.Feed isLoading={isLoading}>
          {showChart && (
            <React.Suspense fallback={<Loader active inline="centered" />}>
              <RatingChart data={chartData} />
            </React.Suspense>
          )}
          {isLoading ? (
            <Loader active inline="centered" />
          ) : (
            <HotelsList hotels={sortedHotels} />
          )}
        </Layout.Feed>
      </Layout>
    </Container>
  );
};


const noop = () => {};

function countHotelsByBedType(data) {
  return data.reduce(function(acc, v) {
    acc[v.room] = acc[v.room] ? acc[v.room] + 1 : 1;
    return acc;
  }, {});
}

function applyFilter(filters, data) {
  console.log(BEDS_TYPE);
  const isFilterSet = BEDS_TYPE.find(b => filters[b.value]);
  if (!isFilterSet) {
    return data;
  }
  const filtered = data.filter(h => filters[h.room]);
  return filtered;
}

function prepareChartData(hotels) {
  return hotels.map(h => ({
    rating: +h.rating.average,
    price: +h.price.amount,
    reviews: +h.rating.reviews,
    name: h.title,
  }));
}
const sortHotels = {
  price: (a, b) => a.price.amount - b.price.amount,
  rating: (a, b) => b.rating.average - a.rating.average,
  reviews: (a, b) => b.rating.reviews - a.rating.reviews,
};

function applySort(hotels, sortField) {
  return hotels.sort(sortHotels[sortField]).concat([]);
}

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

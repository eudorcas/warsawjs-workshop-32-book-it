import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import axios from 'axios';
import { Item, Grid, Loader, Container } from 'semantic-ui-react';

import { Filters } from './Filters';
import { SortBar } from './SortBar';
import { HotelCard } from './HotelCard';
import { StepsContext } from './App';

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

const HotelsList = () => {
  const [sortField, setField] = useState('price');
  const [bedsTypeFilter, setBedType] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { actions } = useContext(StepsContext);
  useEffect(() => {
    const fetchData = async () => {
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

  return (
    <Container>
      <SortBar sortField={sortField} setField={setField} />
      <Layout>
        <Layout.Sidebar>
          <Filters count={hotelsInFilter} onChange={setBedTypeFilter} />
        </Layout.Sidebar>
        <Layout.Feed isLoading={isLoading}>
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              selectHotel={actions.selectHotel}
            />
          ))}
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
    <Item.Group divided>
      {isLoading ? <Loader active inline="centered" /> : children}
    </Item.Group>
  </Grid.Column>
);

Layout.Sidebar = Sidebar;
Layout.Feed = Feed;

export default HotelsList;

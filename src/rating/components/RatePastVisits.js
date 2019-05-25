import React, { useEffect } from 'react';
import { Segment, Container, Button, Statistic, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getHotelForRating } from '../reducers';
import PastVisitsTable from './PastVisitsTable';
import PastVisitsRow from './PastVisitsRow';

const RatePastVisits = ({
  fetchHotels,
  data = [],
  isLoading = false,
  count = 0,
  average = 0,
}) => {
  return (
    <Container text>
      <Segment vertical style={{ padding: '2em 0em' }}>
        <Statistic.Group>
          <Statistic horizontal>
            <Statistic.Value>
              <Icon name="building outline" /> {count}
            </Statistic.Value>
            <Statistic.Label>ocenionych hoteli</Statistic.Label>
          </Statistic>
          <Statistic horizontal>
            <Statistic.Value>
              <Icon name="star outline" /> {average}
            </Statistic.Value>
            <Statistic.Label>twoja średnia ocen</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <PastVisitsTable>
          {data.map(hotel => (
            <PastVisitsRow key={hotel.id} hotel={hotel} />
          ))}
        </PastVisitsTable>
        <Button loading={isLoading} onClick={fetchHotels} fluid>
          Załaduj więcej
        </Button>
      </Segment>
    </Container>
  );
};

export default RatePastVisits;

import React, { useEffect } from 'react';
import { Segment, Container, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getHotelForRating } from '../reducers';
import PastVisitsTable from './PastVisitsTable';
import PastVisitsRow from './PastVisitsRow';

const RatePastVisits = ({ fetchHotels, data = [], isLoading = false }) => {
  return (
    <Container text>
      <Segment vertical style={{ padding: '2em 0em' }}>
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

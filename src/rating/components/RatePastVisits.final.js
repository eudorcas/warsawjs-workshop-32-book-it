import React, { useEffect } from 'react';
import { Segment, Container, Button, Statistic, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getHotelForRating } from '../reducers';
import {
  isLoading,
  getRatingsOrder,
  getRatedHotelsNumber,
  getRatedHotelsAverage,
} from '../selectors';
import PastVisitsTable from './PastVisitsTable';
import PastVisitsRow from './PastVisitsRow';

const RatePastVisits = ({ fetchHotels, order, isLoading, count, average }) => {
  useEffect(() => {
    order.length === 0 && fetchHotels();
  }, [fetchHotels, order]);

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
          {order.map(id => (
            <PastVisitsRow key={id} hotelId={id} />
          ))}
        </PastVisitsTable>
        <Button loading={isLoading} onClick={fetchHotels} fluid>
          Załaduj więcej
        </Button>
      </Segment>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    count: getRatedHotelsNumber(state),
    average: getRatedHotelsAverage(state),
    order: getRatingsOrder(state),
    isLoading: isLoading(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchHotels: () => dispatch(getHotelForRating()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatePastVisits);

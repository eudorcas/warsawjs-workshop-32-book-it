import React, { useEffect } from 'react';
import { Segment, Container, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getHotelForRating } from '../reducers';
import { isLoading, getRatingsOrder } from '../selectors';
import PastVisitsTable from './PastVisitsTable';
import PastVisitsRow from './PastVisitsRow.final';

const RatePastVisits = ({ fetchHotels, order, isLoading }) => {
  useEffect(() => {
    order.length === 0 && fetchHotels();
  }, [fetchHotels, order]);

  return (
    <Container text>
      <Segment vertical style={{ padding: '2em 0em' }}>
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

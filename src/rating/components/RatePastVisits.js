import React, { useEffect } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getHotelForRating } from '../reducers';
import { isLoading, getRatingsOrder } from '../selectors';
import PastVisitsTable from './PastVisitsTable';
import HotelRating from './PastVisitsRow';

const RatePastVisits = ({ fetchHotels, order, isLoading }) => {
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  return (
    <Container text>
      <Segment loading={isLoading} vertical style={{ padding: '2em 0em' }}>
        <PastVisitsTable>
          {order.map(id => (
            <HotelRating key={id} hotelId={id} />
          ))}
        </PastVisitsTable>
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

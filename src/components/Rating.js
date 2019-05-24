import React, { useEffect } from 'react';
import { Segment, Container, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getHotelForRating } from '../rating/rating.reducer';
import { isLoading, getRatingsOrder } from '../rating/rating.selector';
import HotelRating from './HotelRating';

const RatingPastVisits = ({ fetchHotels, order, isLoading }) => {
  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  return (
    <Container text>
      <Segment loading={isLoading} vertical style={{ padding: '2em 0em' }}>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Hotel</Table.HeaderCell>
              <Table.HeaderCell singleLine>Średnia ocena</Table.HeaderCell>
              <Table.HeaderCell singleLine>Twoja ocena</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {order.map(id => (
              <HotelRating key={id} hotelId={id} />
            ))}
          </Table.Body>
        </Table>
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
)(RatingPastVisits);

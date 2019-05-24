import React, { useEffect } from 'react';
import {
  Segment,
  Container,
  Table,
  Rating,
  Header,
  Image,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getHotelForRating, rateHotel } from '../rating/rating.reducer';
import { getRatings, isLoading } from '../rating/rating.selector';

const RatingPastVisits = ({ fetchHotels, data, isLoading, rate }) => {
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
            {data.map(hotel => (
              <Table.Row key={hotel.id}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image src={hotel.cover.url} rounded size="mini" />
                    <Header.Content>
                      {hotel.title}
                      <Header.Subheader>
                        {hotel.location.address}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {hotel.rating.average} ({hotel.rating.reviews})
                </Table.Cell>
                <Table.Cell collapsing>
                  <Rating
                    disabled={!!hotel.rating.user}
                    maxRating={10}
                    onRate={(e, { rating }) => rate(hotel.id, rating)}
                    defaultRating={0}
                    icon="star"
                    size="small"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    data: getRatings(state),
    isLoading: isLoading(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchHotels: () => dispatch(getHotelForRating()),
    rate: (id, rating) => dispatch(rateHotel(id, rating)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatingPastVisits);

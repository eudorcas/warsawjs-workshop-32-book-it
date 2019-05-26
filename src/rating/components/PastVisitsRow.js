import React from 'react';
import { Table, Rating, Header, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { rateHotel } from '../reducers';
import { getHotelToRating } from '../selectors';
import './style.css';

const HotelRating = ({ hotel, rate }) => (
  <Table.Row>
    <Table.Cell>
      <Header as="h4" image>
        <Image
          src={`https://picsum.photos/175?random=${hotel.id}`}
          rounded
          size="mini"
        />
        <Header.Content>
          {hotel.title}
          <Header.Subheader>
            <p className="address-width-limit">{hotel.location.address}</p>
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
);

const mapStateToProps = (state, ownProps) => {
  return {
    hotel: getHotelToRating(state, ownProps.hotelId),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    rate: (id, rating) => dispatch(rateHotel(id, rating)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelRating);

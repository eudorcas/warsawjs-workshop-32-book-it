import React from 'react';
import { Button, Item, Label, Rating } from 'semantic-ui-react';
import HotelDemand from './HotelDemand';

export const HotelCard = props => {
  return (
    <Item>
      <Item.Image
        label={{
          as: 'a',
          corner: 'left',
          icon: 'heart',
        }}
        src={props.hotel.cover.url}
      />

      <Item.Content>
        <Item.Header as="a">{props.hotel.title}</Item.Header>
        <Item.Meta>
          {props.hotel.location.address} (do centrum{' '}
          {props.hotel.location.centre})
        </Item.Meta>
        <Item.Description
          style={{
            minHeight: '76px',
          }}
        >
          <div
            style={{
              float: 'right',
            }}
          >
            <Label tag size={'huge'}>
              {props.hotel.price.amount} {props.hotel.price.currency}
            </Label>
          </div>
          Ocena gości:{' '}
          <Rating
            disabled
            maxRating={10}
            defaultRating={Math.round(props.hotel.rating.average)}
            icon="star"
            size="small"
          />
          <div>
            Ilość opinii: <strong>{props.hotel.rating.reviews}</strong>
          </div>
          <div>
            Śniadanie wliczone w cenę:{' '}
            <strong>{props.hotel.price.breakfast ? 'TAK' : 'NIE'}</strong>
          </div>
          <div>
            Rodzaj łóżka: <strong>{props.hotel.room}</strong>
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            onClick={() => props.selectHotel(props.hotel)}
            primary
            floated="right"
          >
            Wybierz
          </Button>
          <HotelDemand demand={props.hotel.demand} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

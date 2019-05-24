import React from 'react';
import { Item, Label, Rating } from 'semantic-ui-react';

export class HotelCard extends React.Component {
  render() {
    const { hotel } = this.props;

    return (
      <Item.Group divided>
        <Item>
          <Item.Image src={hotel.cover.url} />
          <Item.Content>
            <Item.Header as="a">{hotel.title}</Item.Header>
            <Item.Meta>
              {hotel.location.address} (do centrum {hotel.location.centre})
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
                  {hotel.price.amount} {hotel.price.currency}
                </Label>
              </div>
              Ocena gości:{' '}
              <Rating
                disabled
                maxRating={10}
                defaultRating={Math.round(hotel.rating.average)}
                icon="star"
                size="small"
              />
              <div>
                Śniadanie wliczone w cenę:{' '}
                <strong>{hotel.price.breakfast ? 'TAK' : 'NIE'}</strong>
              </div>
              <div>
                Rodzaj łóżka: <strong>{hotel.room}</strong>
              </div>
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

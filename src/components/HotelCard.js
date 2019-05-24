import React from 'react';
import { Button, Item, Label, Rating } from 'semantic-ui-react';

export class HotelCard extends React.Component {
  render() {
    return (
      <Item>
        <Item.Image
          label={{
            as: 'a',
            corner: 'left',
            icon: 'heart',
          }}
          src={this.props.hotel.cover.url}
        />

        <Item.Content>
          <Item.Header as="a">{this.props.hotel.title}</Item.Header>
          <Item.Meta>
            {this.props.hotel.location.address} (do centrum{' '}
            {this.props.hotel.location.centre})
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
                {this.props.hotel.price.amount}{' '}
                {this.props.hotel.price.currency}
              </Label>
            </div>
            Ocena gości:{' '}
            <Rating
              disabled
              maxRating={10}
              defaultRating={Math.round(this.props.hotel.rating.average)}
              icon="star"
              size="small"
            />
            <div>
              Ilość opinii: <strong>{this.props.hotel.rating.reviews}</strong>
            </div>
            <div>
              Śniadanie wliczone w cenę:{' '}
              <strong>
                {this.props.hotel.price.breakfast ? 'TAK' : 'NIE'}
              </strong>
            </div>
            <div>
              Rodzaj łóżka: <strong>{this.props.hotel.room}</strong>
            </div>
          </Item.Description>
          <Item.Extra>
            <Button
              onClick={() => this.props.selectHotel(this.props.hotel)}
              primary
              floated="right"
            >
              Wybierz
            </Button>
            <Label icon="globe" content={this.props.hotel.demand} />
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

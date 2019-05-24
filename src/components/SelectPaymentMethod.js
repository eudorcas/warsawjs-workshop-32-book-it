import React from 'react';
import {
  Button,
  Item,
  Divider,
  Header,
  Dropdown,
  Label,
  Rating,
} from 'semantic-ui-react';

import data from '../data.json';
export const item = data.list[0];

export const paymentsOptions = [
  {
    key: 'blik',
    text: 'BLIK',
    value: 'blik',
  },
  {
    key: 'paypal',
    text: 'PayPal',
    value: 'paypal',
  },
  {
    key: 'card',
    text: 'Karta Kredytowa',
    value: 'card',
  },
];

export class SelectPaymentMethod extends React.Component {
  render() {
    return (
      <>
        <Item.Group divided>
          <Item>
            <Item.Image src={item.cover.url} />
            <Item.Content>
              <Item.Header as="a">{item.title}</Item.Header>
              <Item.Meta>
                {item.location.address} (do centrum {item.location.centre})
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
                    {item.price.amount} {item.price.currency}
                  </Label>
                </div>
                Ocena gości:{' '}
                <Rating
                  disabled
                  maxRating={10}
                  defaultRating={Math.round(item.rating.average)}
                  icon="star"
                  size="small"
                />
                <div>
                  Śniadanie wliczone w cenę:{' '}
                  <strong>{item.price.breakfast ? 'TAK' : 'NIE'}</strong>
                </div>
                <div>
                  Rodzaj łóżka: <strong>{item.room}</strong>
                </div>
              </Item.Description>
              <Item.Extra>
                <Label icon="globe" content={item.demand} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Header as="h3">Wybierz formę płatności:</Header>
        <Dropdown
          placeholder="forma płatności..."
          fluid
          selection
          options={paymentsOptions}
        />
        <Divider hidden />
        <Button primary>Potwierdź</Button>
      </>
    );
  }
}

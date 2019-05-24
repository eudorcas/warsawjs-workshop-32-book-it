import React from 'react';
import {
  Button,
  Item,
  Divider,
  Grid,
  Header,
  Icon,
  Checkbox,
  Label,
  Menu,
  Rating,
} from 'semantic-ui-react';

import data from '../data.json';
const item = data.list[0];

const HotelsList = ({ selectHotel }) => (
  <>
    <Menu secondary>
      <Menu.Menu position="right">
        <Menu.Item>Sortuj według:</Menu.Item>
        <Menu.Item as="a">Cena</Menu.Item>
        <Menu.Item as="a">Ocena gości</Menu.Item>
        <Menu.Item as="a">
          Odległość od centrum <Icon name="caret down" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <Grid stackable divided>
      <Grid.Row>
        <Grid.Column width={4}>
          <Header as="h4">Filtruj według następujących kryteriów:</Header>
          <Divider fitted />
          <Header as="h5">Śniadanie wliczone w cenę</Header>
          <Checkbox label="tak" />
          <br />
          <Checkbox label="nie" />
          <Header as="h5">Rodzaj łóżka</Header>
          <Checkbox label="Double" />
          <br />
          <Checkbox label="Single" />
          <br />
          <Checkbox label="Twin" />
          <br />
        </Grid.Column>
        <Grid.Column width={12}>
          <Item.Group divided>
            <Item>
              <Item.Image
                label={{ as: 'a', corner: 'left', icon: 'heart' }}
                src={item.cover.url}
              />

              <Item.Content>
                <Item.Header as="a">{item.title}</Item.Header>
                <Item.Meta>
                  {item.location.address} (do centrum {item.location.centre})
                </Item.Meta>
                <Item.Description style={{ minHeight: '76px' }}>
                  <div style={{ float: 'right' }}>
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
                  <Button
                    onClick={() => selectHotel(item)}
                    primary
                    floated="right"
                  >
                    Wybierz
                  </Button>
                  <Label icon="globe" content={item.demand} />
                </Item.Extra>
              </Item.Content>
            </Item>
            <Item>
              <Item.Image
                label={{ as: 'a', corner: 'left', icon: 'heart' }}
                src={item.cover.url}
              />

              <Item.Content>
                <Item.Header as="a">{item.title}</Item.Header>
                <Item.Meta>
                  {item.location.address} (do centrum {item.location.centre})
                </Item.Meta>
                <Item.Description style={{ minHeight: '76px' }}>
                  <div style={{ float: 'right' }}>
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
                  <Button primary floated="right">
                    Wybierz
                  </Button>
                  <Label icon="globe" content={item.demand} />
                </Item.Extra>
              </Item.Content>
            </Item>
            <Item>
              <Item.Image
                label={{ as: 'a', corner: 'left', icon: 'heart' }}
                src={item.cover.url}
              />

              <Item.Content>
                <Item.Header as="a">{item.title}</Item.Header>
                <Item.Meta>
                  {item.location.address} (do centrum {item.location.centre})
                </Item.Meta>
                <Item.Description style={{ minHeight: '76px' }}>
                  <div style={{ float: 'right' }}>
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
                  <Button primary floated="right">
                    Wybierz
                  </Button>
                  <Label icon="globe" content={item.demand} />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </>
);

export default HotelsList;

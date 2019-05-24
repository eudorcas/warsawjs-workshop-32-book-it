import React, { useEffect, useState } from 'react';
import {
  Segment,
  Container,
  Table,
  Rating,
  Header,
  Image,
} from 'semantic-ui-react';
import axios from 'axios';

const RatingPastVisits = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(process.env.PUBLIC_URL + '/data.json');
      setIsLoading(false);
      setData(result.data.list);
    };
    fetchData();
  }, []);

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
                    maxRating={10}
                    onRate={(...arg) => console.log({ arg })}
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

export default RatingPastVisits;

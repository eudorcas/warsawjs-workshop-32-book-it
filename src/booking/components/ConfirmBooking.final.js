import React, { useEffect } from 'react';
import { Button, Table, Divider, Container, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { completeBooking, closeSummary } from '../reducers';
import {
  getBookingError,
  isBookingInProgress,
  isBookingComplete,
  isBookingFailure,
  isBookingSuccess,
} from '../selectors';

import HotelsList from './HotelsList';
import { useBookingFlow } from './BookingContext';

const ConfirmBooking = ({
  complete,
  loading,
  close,
  isComplete,
  isSuccess,
  isFailure,
  error,
}) => {
  const { state, reset } = useBookingFlow();
  const { hotel, paymentMethod } = state;
  useEffect(() => {
    return function cleanup() {
      close();
    };
  }, [close]);
  return (
    <Container text>
      <HotelsList hotels={[hotel]} />
      <Table basic="very">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Forma płatności</Table.Cell>
            <Table.Cell collapsing textAlign="right">
              {paymentMethod}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cena z pokój</Table.Cell>
            <Table.Cell collapsing textAlign="right">
              {hotel.price.amount} zł
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Podatek VAT 8%</Table.Cell>
            <Table.Cell collapsing textAlign="right">
              + {(+hotel.price.amount * 0.08).toFixed(2)} zł
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <strong>Suma</strong>
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
              <strong>
                {(+hotel.price.amount + +hotel.price.amount * 0.08).toFixed(2)}{' '}
                zł
              </strong>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {isSuccess && (
        <Message
          success
          header="Rezerwacja zakończyła się sukcesem"
          content="Zapraszamy do skorzystania z naszych usług w przyszłości"
        />
      )}
      {isFailure && (
        <Message
          error
          header="Rezerwacja zakończyła się niepowodzeniem"
          content={error}
        />
      )}
      {!isComplete && !isFailure && (
        <Button
          loading={loading}
          onClick={() => complete({ id: hotel.id, paymentMethod })}
          primary
          floated="right"
        >
          Zarezerwuj
        </Button>
      )}
      <Button onClick={() => reset()} floated="left">
        Powrót do listy hoteli
      </Button>
      <Divider hidden fitted clearing />
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    error: getBookingError(state),
    loading: isBookingInProgress(state),
    isComplete: isBookingComplete(state),
    isSuccess: isBookingSuccess(state),
    isFailure: isBookingFailure(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    complete: booking => dispatch(completeBooking(booking)),
    close: () => dispatch(closeSummary()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmBooking);

import React, { useContext, useEffect } from 'react';
import { Button, Table, Divider, Container, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  getReservationError,
  isReservationInProgress,
  isReservationComplete,
  isReservationFailure,
  isReservationSuccess,
} from '../reservation/reservation.selector';

import { HotelCard } from './HotelSummary';
import { StepsContext } from './App';

const ReservationSummary = ({
  complete,
  loading,
  close,
  isComplete,
  isSuccess,
  isFailure,
  error,
}) => {
  const {
    state: { hotel, paymentMethod },
    actions: { reset },
  } = useContext(StepsContext);
  useEffect(() => {
    return function cleanup() {
      close();
    };
  }, [close]);
  return (
    <Container text>
      <HotelCard hotel={hotel} />
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
              {hotel.price.amount} {hotel.price.currency}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Podatek VAT 8%</Table.Cell>
            <Table.Cell collapsing textAlign="right">
              + {+hotel.price.amount * 0.08} zł
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <strong>Suma</strong>
            </Table.Cell>
            <Table.Cell collapsing textAlign="right">
              <strong>
                + {+hotel.price.amount + +hotel.price.amount * 0.08} zł
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
      {!isComplete && (
        <Button loading={loading} onClick={complete} primary floated="right">
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
    error: getReservationError(state),
    loading: isReservationInProgress(state),
    isComplete: isReservationComplete(state),
    isSuccess: isReservationSuccess(state),
    isFailure: isReservationFailure(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    complete: () => dispatch({ type: 'COMPLETE_RESERVATION' }),
    close: () => dispatch({ type: 'CLOSE_SUMMARY' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationSummary);

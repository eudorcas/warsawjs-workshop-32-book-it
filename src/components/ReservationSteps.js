import React from 'react';
import { Step, Icon } from 'semantic-ui-react';

export default class ReservationSteps extends React.Component {
  render() {
    const { step = 2 } = this.props;

    return (
      <Step.Group widths={3}>
        <Step disabled={step !== 1} active={step === 1}>
          {step > 1 ? (
            <Icon color="green" name="checkmark" />
          ) : (
            <Icon name="bed" />
          )}
          <Step.Content>
            <Step.Title>Lista hoteli</Step.Title>
            <Step.Description>Wybierz pokój dla siebie</Step.Description>
          </Step.Content>
        </Step>
        <Step disabled={step !== 2} active={step === 2}>
          {step > 2 ? (
            <Icon color="green" name="checkmark" />
          ) : (
            <Icon name="payment" />
          )}
          <Step.Content>
            <Step.Title>Płatność</Step.Title>
            <Step.Description>Wprowadź formę płatności</Step.Description>
          </Step.Content>
        </Step>
        <Step disabled={step !== 3} active={step === 3}>
          {step > 3 ? (
            <Icon color="green" name="checkmark" />
          ) : (
            <Icon name="file alternate outline" />
          )}
          <Step.Content>
            <Step.Title>Potwierdzenie</Step.Title>
            <Step.Description>Potwierdź rezerwacje</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    );
  }
}

import React, { useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import {
  isModalOpen,
  getAuthError,
  isLoginInProgress,
} from '../auth/auth.selector';
import { loginUser, closeAuthModal } from '../auth/auth.reducer';

const LoginForm = ({ isOpen, close, login, error, loading }) => {
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Modal open={isOpen} basic size="mini">
      <Segment textAlign="center" stacked>
        <Header>Zaloguj się</Header>

        {error && <Message warning>{error}</Message>}
        <Form onSubmit={() => login(nick, password)} size="large">
          <Segment stacked>
            <Form.Input
              name="nick"
              onChange={(e, { value }) => setNick(value)}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="nick"
            />
            <Form.Input
              onChange={(e, { value }) => setPassword(value)}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="hasło"
              type="password"
            />

            <Button loading={loading} color="teal" fluid size="large">
              Zaloguj
            </Button>
            <br />
            <Button onClick={close} basic fluid size="large">
              Anuluj
            </Button>
          </Segment>
        </Form>
        <Message>
          nick: <strong>dowolny</strong>
          <br /> hasło: <strong>admin</strong>
        </Message>
      </Segment>
    </Modal>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: isModalOpen(state),
    error: getAuthError(state),
    loading: isLoginInProgress(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (nick, password) => dispatch(loginUser(nick, password)),
    close: () => dispatch(closeAuthModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

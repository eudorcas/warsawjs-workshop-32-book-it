import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
import { isAuthenticated, getUserNick } from '../../auth/selectors';
import { startManualLogin, logoutUser } from '../../auth/reducers';

import {
  Button,
  Container,
  Header,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';

class MenuBar extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { isAuthenticated, login, nick, logout } = this.props;
    const { fixed } = this.state;

    return (
      <Visibility
        once={false}
        onBottomPassed={this.showFixedMenu}
        onBottomPassedReverse={this.hideFixedMenu}
      >
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 200, padding: '0.5em 0em' }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <Container>
              <Menu.Item to="/" as={Link} active>
                BOOKit
              </Menu.Item>
              <Menu.Item position="right">
                {!isAuthenticated ? (
                  <>
                    <Button
                      style={{ marginLeft: '0.5em' }}
                      to="rate"
                      as={Link}
                      inverted={!fixed}
                    >
                      Oceń pobyt
                    </Button>
                    <Button
                      style={{ marginLeft: '0.5em' }}
                      onClick={login}
                      as="a"
                      inverted={!fixed}
                    >
                      Zaloguj
                    </Button>
                  </>
                ) : (
                  <>
                    Witaj, {nick}
                    <Button
                      style={{ marginLeft: '0.5em' }}
                      to="rate"
                      as={Link}
                      inverted={!fixed}
                    >
                      Oceń pobyt
                    </Button>
                    <Button
                      as="a"
                      onClick={logout}
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: '0.5em' }}
                    >
                      Wyloguj
                    </Button>
                  </>
                )}
              </Menu.Item>
            </Container>
          </Menu>
          <HomepageHeading />
        </Segment>
      </Visibility>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: isAuthenticated(state),
    nick: getUserNick(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => dispatch(startManualLogin()),
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);

const HomepageHeading = () => (
  <Container>
    <Header
      as="h1"
      inverted
      style={{
        fontSize: '3em',
        fontWeight: 'normal',
        marginBottom: '0.5em',
        marginTop: '0.5em',
      }}
    >
      Zarezerwuj DZIŚ i ciesz się JUTREM.
      <Header.Subheader>
        Wyszukiwarka wolnych pokojów tylko na dzień do przodu w najlepszych
        cenach.
      </Header.Subheader>
    </Header>
  </Container>
);

import React from 'react';
// import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userName: '',
    };
  }

  componentDidMount() {
    this.handleUserName();
  }

  handleUserName = async () => {
    const fetchUserName = await getUser();
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
    this.setState({ userName: fetchUserName });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">
            { userName.name }
          </p>
        )}
      </header>
    );
  }
}

export default Header;

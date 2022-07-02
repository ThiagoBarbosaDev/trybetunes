import React from 'react';
import { Link } from 'react-router-dom';
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
        <ul>
          <li><Link to="/search " data-testid="link-to-search">Search</Link></li>
          <li><Link to="/favorites " data-testid="link-to-favorites">Favorites</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
        </ul>
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

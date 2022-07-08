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
      userData: {},
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    const userData = await getUser();
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
      userData,
    }));
  }

  render() {
    const { isLoading, userData: { name } } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <nav>
          <ul>
            <li>
              <Link to="/search " data-testid="link-to-search">Search</Link>
            </li>
            <li>
              <Link to="/favorites " data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </li>
          </ul>
        </nav>
        {isLoading ? <Loading /> : <p data-testid="header-user-name">{name}</p>}
      </header>
    );
  }
}

export default Header;

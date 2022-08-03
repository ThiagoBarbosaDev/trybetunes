import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';
import defaultUserLogo from '../assets/icons/default.png';
import trybeTunesLogo from '../assets/logo/logo.png';

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
    const { isLoading, userData: { name, image } } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <div className="user-container">
          <img className="user-container__logo" src={ trybeTunesLogo } alt="logo" />
          {isLoading ? <Loading positive="white" /> : (
            <div className="user-background">
              { image ? (
                <img
                  className="user-container__profile-logo"
                  alt="profile"
                  src={ image }
                />
              ) : (
                <img
                  src={ defaultUserLogo }
                  alt="profile"
                  className="user-container__profile-logo"
                />
              )}
              <p className="header-user" data-testid="header-user-name">{name}</p>
            </div>
          )}
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/search"
                data-testid="link-to-search"
                style={ (isActive) => ({
                  color: isActive ? 'white' : '#036B52',
                  background: isActive ? '#036B52' : null,
                }) }
              >
                Search
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                data-testid="link-to-favorites"
                style={ (isActive) => ({
                  color: isActive ? 'white' : '#036B52',
                  background: isActive ? '#036B52' : null,
                }) }
              >
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                data-testid="link-to-profile"
                style={ (isActive) => ({
                  color: isActive ? 'white' : '#036B52',
                  background: isActive ? '#036B52' : null,
                }) }
              >
                Perfil
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;

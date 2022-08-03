import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import logo from '../assets/icons/account.svg';
import './profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userData: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  toggleLoading = () => this.setState((prvState) => ({ isLoading: !prvState.isLoading }));

  fetchUser = async () => {
    this.toggleLoading();
    const userData = await getUser();
    this.setState((prvState) => ({ isLoading: !prvState.isLoading, userData }));
  }

  render() {
    const { isLoading, userData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <div className="profile-container">
            <div className="profile-container__wrapper">
              <img
                src={ userData?.image ? userData?.image : logo }
                alt="foto do usuário"
                data-testid="profile-image"
              />
              <Link
                to="/profile/edit"
                className="profile-container__link"
              >
                Editar perfil
              </Link>
            </div>
            <div>
              <h2>Nome</h2>
              <p>{userData?.name}</p>
            </div>
            <div>
              <h2>E-mail</h2>
              <p>{userData?.email}</p>
            </div>
            <div>
              <h2>Descrição</h2>
              <p>{userData?.description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;

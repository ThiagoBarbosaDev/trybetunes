import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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

  fetchUser = async () => {
    this.toggleLoading();
    const userData = await getUser();
    this.setState({ userData });
    this.toggleLoading();
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
    }));
  }

  render() {
    const { isLoading, userData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <Link to="/profile/edit">Editar perfil</Link>
            <img
              src={ userData?.image }
              alt="foto do usuário"
              data-testid="profile-image"
            />
            <h2>Nome</h2>
            <p>{userData?.name}</p>
            <h2>E-mail</h2>
            <p>{userData?.email}</p>
            <h2>Descrição</h2>
            <p>{userData?.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;

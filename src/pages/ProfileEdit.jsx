import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './profileedit.css';
import defaultlogo from '../assets/icons/account.svg';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      avatar: '',
      userData: {
        name: '',
        email: '',
        description: '',
        image: '',
      },
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.toggleLoading();
    const userData = await getUser();
    this.setState({ userData, avatar: userData.image });
    this.toggleLoading();
  }

  toggleLoading = () => this.setState((prvState) => ({ isLoading: !prvState.isLoading }));

  handleChange = ({ target: { value, checked, type, name } }) => {
    const val = type === 'checkbox' ? checked : value;
    this.setState((prevState) => ({ userData: { ...prevState.userData, [name]: val },
    }));
  }

  handleSubmit = async () => {
    const { history: { push } } = this.props;
    const { userData: { name, email, description,
      image } } = this.state;
    const userDataToSave = {
      name,
      email,
      image,
      description,
    };
    this.toggleLoading();
    await updateUser(userDataToSave);
    push('/profile');
  }

  render() {
    const { isLoading, avatar, userData: { name, email, description,
      image } } = this.state;
    const isValid = !(name && email && description && image);
    return (
      <div data-testid="page-profile-edit" className="profile-edit-page">
        <Header />
        { isLoading ? <Loading /> : (
          <form className="profile-edit-container">
            <div className="profile-edit-container__wrapper">
              <img
                alt="profile"
                src={ avatar ? avatar : defaultlogo }
                className="profile-edit-container__logo"
              />
              <div className="profile-edit-container__image-input-wrapper">
                <Input
                  className="profile-edit-container__input"
                  name="image"
                  type="text"
                  dataTestId="edit-input-image"
                  value={ image }
                  onChange={ this.handleChange }
                  breakpage="true"
                  placeholder="Insinar um link"
                  label="Image:"
                />
              </div>
            </div>
            <Input
              className="profile-edit-container__input"
              name="name"
              type="text"
              value={ name }
              dataTestId="edit-input-name"
              onChange={ this.handleChange }
              breakpage="true"
              placeholder="Nome"
              label="Name:"
            >
              <p className="profile-edit-container__paragraph">
                Fique à vontade para usar seu nome social
              </p>
            </Input>
            <Input
              className="profile-edit-container__input"
              name="email"
              type="email"
              value={ email }
              dataTestId="edit-input-email"
              onChange={ this.handleChange }
              breakpage="true"
              placeholder="usuario@usuario.com.br"
              label="Email:"
            >
              <p className="profile-edit-container__paragraph">
                Escolha um e-mail que consulte diariamente
              </p>
            </Input>
            <Input
              className="profile-edit-container__input"
              name="description"
              type="text"
              value={ description }
              dataTestId="edit-input-description"
              onChange={ this.handleChange }
              breakpage="true"
              placeholder="Sobre mim"
              label="Description:"
            />
            <Button
              className="profile-edit-container__button"
              dataTestId="edit-button-save"
              type="button"
              disabled={ isValid }
              onClick={ this.handleSubmit }
              breakpage="true"
            >
              Salvar
            </Button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ProfileEdit;

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
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
    this.setState({ userData });
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
    const { isLoading, userData: { name, email, description,
      image } } = this.state;
    const isValid = !(name && email && description && image);
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : (
          <form>
            <Input
              name="image"
              type="text"
              dataTestId="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
            >
              Image:
            </Input>
            <Input
              name="name"
              type="text"
              value={ name }
              dataTestId="edit-input-name"
              onChange={ this.handleChange }
            >
              Name:
            </Input>
            <Input
              name="email"
              type="email"
              value={ email }
              dataTestId="edit-input-email"
              onChange={ this.handleChange }
            >
              Email:
            </Input>
            <Input
              name="description"
              type="text"
              value={ description }
              dataTestId="edit-input-description"
              onChange={ this.handleChange }
            >
              Description:
            </Input>
            <Button
              dataTestId="edit-button-save"
              type="button"
              disabled={ isValid }
              onClick={ this.handleSubmit }
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

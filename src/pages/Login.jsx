import React from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../assets/logo/logopositiva.svg';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isButtonDisabled: true,
      inputUser: '',
    };
  }

  handleLogIn = async () => {
    const { history: { push } } = this.props;
    const { inputUser } = this.state;
    this.setState((prevState) => ({ isLoading: !prevState.loading }));
    await createUser({ name: inputUser });
    push('/search');
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
    this.handleButtonValidation(value);
  }

  handleButtonValidation = (inputUserValue) => {
    const minValidLength = 3;
    const isButtonDisabled = inputUserValue.length < minValidLength;
    this.setState({ isButtonDisabled });
  }

  render() {
    const { isLoading, inputUser, isButtonDisabled } = this.state;
    if (isLoading) { return <Loading />; }
    return (
      <main data-testid="page-login" className="login-container">
        <img alt="trybe-logo" src={ logo } className="login-container__logo" />
        <section className="login-container__user-input">
          <Input
            dataTestId="login-name-input"
            type="text"
            name="inputUser"
            value={ inputUser }
            onChange={ (evt) => this.handleChange(evt) }
            placeholder="nome"
            className="login-container__input"
          />
          <Button
            dataTestId="login-submit-button"
            disabled={ isButtonDisabled }
            type="button"
            onClick={ this.handleLogIn }
            className="login-container__button"
          >
            Entrar
          </Button>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;

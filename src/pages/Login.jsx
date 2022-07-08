import React from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
    return (
      <div data-testid="page-login">
        Login
        <Input
          dataTestId="login-name-input"
          type="text"
          name="inputUser"
          value={ inputUser }
          onChange={ (evt) => this.handleChange(evt) }
        />
        <Button
          dataTestId="login-submit-button"
          disabled={ isButtonDisabled }
          type="button"
          onClick={ this.handleLogIn }
        >
          Entrar
        </Button>
        {isLoading && <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;

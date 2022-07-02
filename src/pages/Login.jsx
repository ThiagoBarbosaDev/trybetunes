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
    };
  }

  handleLogIn = async () => {
    const {
      logInInputUser,
      history: { push },
    } = this.props;
    this.setState((prevState) => ({ isLoading: !prevState.loading }));
    await createUser({ name: logInInputUser });
    push('/search');
  };

  render() {
    const {
      logInInputUser,
      handleChange,
      isLoginButtonDisabled,
      handleButtonValidation,
    } = this.props;
    const { isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div data-testid="page-login">
        Login
        <Input
          dataTestId="login-name-input"
          type="text"
          name="logInInputUser"
          value={ logInInputUser }
          onChange={ (e) => {
            handleChange(e, handleButtonValidation);
          } }
        />
        <Button
          dataTestId="login-submit-button"
          disabled={ isLoginButtonDisabled }
          type="button"
          onClick={ this.handleLogIn }
        >
          Entrar
        </Button>
      </div>
    );
  }
}

Login.propTypes = {
  isLoginButtonDisabled: PropTypes.bool.isRequired,
  logInInputUser: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleButtonValidation: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logInInputUser: '',
      isLoginButtonDisabled: true,
    };
  }

  handleChange = ({ target: { value, checked, type, name } }, callback) => {
    const val = type === 'checkbox' ? checked : value;
    this.setState({ [name]: val }, () => callback());
  }

  handleButtonValidation = () => {
    const { logInInputUser } = this.state;
    const minUserInputLength = 3;
    const isMinLengthValid = logInInputUser.length < minUserInputLength;
    this.setState({
      isLoginButtonDisabled: isMinLengthValid,
    });
  }

  render() {
    return (
      <Switch>
        <Route path="/album/:id" component={ Album } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/search" component={ Search } />
        <Route
          exact
          path="/"
          render={ (props) => (
            <Login
              { ...props }
              { ...this.state }
              handleButtonValidation={ this.handleButtonValidation }
              handleChange={ this.handleChange }
            />
          ) }
        />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;

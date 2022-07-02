import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';

class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Route path="/album/:id" component={ Album } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/search" component={ Search } />
      </>
    );
  }
}

export default Layout;

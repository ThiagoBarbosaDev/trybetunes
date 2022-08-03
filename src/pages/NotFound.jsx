import React from 'react';
import './notfound.css';
import logo from '../assets/logo/logopositiva.svg';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <section className="not-found-container">
          <img alt="logo" src={ logo } />
          <div className="not-found-container__wrapper">
            <p className='ops'>Ops!</p>
            <p className='ops-small'>A página que você está procurando não foi encontrada</p>
          </div>
        </section>
      </div>
    );
  }
}

export default NotFound;

import React from 'react';
import PropTypes from 'prop-types';
import './loading.css';

class Loading extends React.Component {
  render() {
    const { positive } = this.props;
    return (
      <div className="loading-container">
        <p className={ positive ? positive : 'loading-container__text' }>Carregando...</p>
      </div>
    );
  }
}

Loading.propTypes = {
  positive: PropTypes.string,
};

Loading.defaultProps = {
  positive: '',
};

export default Loading;

import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { dataTestId,
      children, type, ...otherProps } = this.props;
    return (
      <button
        data-testid={ dataTestId }
        type={ type === 'button' ? 'button' : 'submit' }
        { ...otherProps }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  dataTestId: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  type: 'button',
  dataTestId: '',
  children: '',
};

export default Button;

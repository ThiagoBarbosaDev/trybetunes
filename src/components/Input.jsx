import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { dataTestId,
      children, type, name, value, checked, ...otherProps } = this.props;
    return (
      <label htmlFor={ `input-${name}` }>
        { children }
        <input
          data-testid={ dataTestId }
          name={ name }
          id={ `input-${name}` }
          type={ type }
          value={ value }
          checked={ checked }
          { ...otherProps }
        />
      </label>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  children: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
};

Input.defaultProps = {
  value: '',
  checked: null,
  dataTestId: '',
  children: '',
  label: '',
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { dataTestId, placeholder, className, breakpage, label,
      children, type, name, value, checked, ...otherProps } = this.props;
    return (
      <label htmlFor={ `input-${name}` }>
        { label }
        { breakpage && <br /> }
        { children }
        <input
          data-testid={ dataTestId }
          name={ name }
          id={ `input-${name}` }
          type={ type }
          value={ value }
          checked={ checked }
          placeholder={ placeholder }
          className={ className }
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
  value: PropTypes.string,
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  breakpage: PropTypes.string,
  children: PropTypes.node,
};

Input.defaultProps = {
  value: '',
  checked: null,
  dataTestId: '',
  label: '',
  placeholder: '',
  className: '',
  breakpage: '',
  children: null,
};

export default Input;

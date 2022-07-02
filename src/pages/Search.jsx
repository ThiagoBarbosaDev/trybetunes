import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

class Search extends React.Component {
  render() {
    const { handleChange, searchInput, handleSearchButtonValidation,
      isSearchButtonDisabled } = this.props;
    console.log(searchInput);
    return (
      <div data-testid="page-search">
        <Header dataTestId="header-component" />
        <form>
          <fieldset>
            <legend>Search Tunes</legend>
            <Input
              dataTestId="search-artist-input"
              type="text"
              name="searchInput"
              value={ searchInput }
              onChange={ (e) => handleChange(e, handleSearchButtonValidation) }
            />
            <Button
              dataTestId="search-artist-button"
              disabled={ isSearchButtonDisabled }
              type="button"
              // onClick={ this.handleLogIn }
            >
              Pesquisar
            </Button>
          </fieldset>
        </form>
        {/* <input data-testid="search-artist-input" />
        <button type="button" data-testid="search-artist-button">Pesquisar</button> */}
      </div>
    );
  }
}

Search.propTypes = {
  handleSearchButtonValidation: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  isSearchButtonDisabled: PropTypes.bool.isRequired,
};

export default Search;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  renderCards = () => {
    const { albumData } = this.props;
    const data = albumData;
    return data[0]
      ? data
        .map((card) => (
          <AlbumCard data={ { ...card } } key={ `${card.collectionId}` } />))
      : <p>Nenhum álbum foi encontrado</p>;
  }

  render() {
    const { handleChange, searchInput, handleSearchButtonValidation,
      isSearchButtonDisabled, handleOnClickSearch, isSearchLoading,
      lastSearchQuery } = this.props;
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
              onClick={ handleOnClickSearch }
            >
              Pesquisar
            </Button>
          </fieldset>
        </form>
        <div>
          {isSearchLoading ? <Loading /> : (
            <>
              <p>
                {`Resultado de álbuns de: ${lastSearchQuery}`}
              </p>
              { this.renderCards() }
            </>
          )}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  handleSearchButtonValidation: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  lastSearchQuery: PropTypes.string.isRequired,
  isSearchButtonDisabled: PropTypes.bool.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  handleOnClickSearch: PropTypes.func.isRequired,
  albumData: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  })).isRequired,
};

// Search.defaultProps = {
//   albumData: {
//     collectionId: 0,
//     artistName: '',
//     artworkUrl100: '',
//     collectionName: '',
//   },
// };

export default Search;

import React from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      isLoading: false,
      albumData: [],
      searchInput: '',
      lastestQuery: '',
    };
  }

  handleOnClickSearch = async () => {
    const { searchInput } = this.state;

    this.setState((prvState) => ({
      isLoading: !prvState.isLoading,
      lastestQuery: searchInput,
    }));

    const albumData = await searchAlbumsAPI(searchInput);

    this.setState((prvState) => ({
      isLoading: !prvState.isLoading,
      searchInput: '',
      albumData,
    }));
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
    this.handleButtonValidation(value);
  }

  handleButtonValidation = (inputUserValue) => {
    const minValidLength = 2;
    const isButtonDisabled = inputUserValue.length < minValidLength;
    this.setState({ isButtonDisabled });
  }

  renderCards = () => {
    const { albumData } = this.state;
    return albumData.length
      ? albumData.map((card) => (
        <AlbumCard data={ { ...card } } key={ `${card.collectionId}` } />
      ))
      : <p>Nenhum álbum foi encontrado</p>;
  }

  render() {
    const { searchInput, isLoading, isButtonDisabled, lastestQuery } = this.state;
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
              onChange={ (evt) => this.handleChange(evt) }
            />
            <Button
              dataTestId="search-artist-button"
              disabled={ isButtonDisabled }
              type="button"
              onClick={ this.handleOnClickSearch }
            >
              Pesquisar
            </Button>
          </fieldset>
        </form>
        <div>
          { isLoading ? <Loading /> : !!lastestQuery && (
            <>
              <p>
                {`Resultado de álbuns de: ${lastestQuery}`}
              </p>
              { this.renderCards() }
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      musicData: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
    this.updateFavorites();
  }

  toggleLoading = () => {
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  }

  addRemoveFavorite = async (musicObj) => {
    const { favoriteSongs } = this.state;
    const isFavorite = favoriteSongs.some((data) => data.trackId === musicObj.trackId);
    this.toggleLoading();
    if (isFavorite) { await removeSong(musicObj); } else { await addSong(musicObj); }
    await this.updateFavorites();
    this.toggleLoading();
  }

  updateFavorites = async () => {
    const localStorageData = await getFavoriteSongs();
    this.setState({ favoriteSongs: [...localStorageData] });
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const allMusicData = await getMusics(id);
    this.setState({ musicData: [...allMusicData] });
  }

  renderMusicPreview = () => {
    const { musicData, favoriteSongs } = this.state;
    const favData = favoriteSongs.map((data) => (data.trackId));
    const musicTracksData = musicData.slice(1);
    return musicTracksData.map((data) => {
      const isFavorite = favData.includes(data.trackId);
      return (
        <MusicCard
          { ...data }
          favSongs={ favoriteSongs }
          isChecked={ isFavorite }
          key={ data.trackName }
          onClick={ this.addRemoveFavorite }
          data={ data }
          flex="end"
        />
      );
    });
  }

  render() {
    const { musicData, isLoading } = this.state;
    return (
      <>
        <Header />
        {isLoading ? <Loading /> : (
          <main className="album-data-container">
            <div data-testid="page-album" className="album-data-container__album-wrapper">
              <img
                alt="album"
                src={ musicData[0]?.artworkUrl100 }
                className="album-data-container__album-image"
              />
              <h2 data-testid="album-name" className="album-data-container__album-name">
                { musicData[0]?.collectionName }
              </h2>
              <h3
                data-testid="artist-name"
                className="album-data-container__album-artist"
              >
                { musicData[0]?.artistName }
              </h3>
            </div>
            <div className="album-data-container__tracks">
              { this.renderMusicPreview()}
            </div>
          </main>
        )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape(
      { id: PropTypes.number.isRequired },
    ).isRequired,
    }.isRequired,
  ).isRequired,
};

export default Album;

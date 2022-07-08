import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
          <>
            <div>
              { this.renderMusicPreview()}
            </div>
            <div data-testid="page-album">
              <h2 data-testid="artist-name">
                { musicData[0]?.artistName }
              </h2>
              <h3 data-testid="album-name">
                { musicData[0]?.collectionName }
              </h3>
            </div>
          </>
        )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(
    { match: PropTypes.shape(
      { id: PropTypes.number.isRequired },
    ).isRequired,
    }.isRequired,
  ).isRequired,
};

export default Album;

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
      musicData: [],
      isLoading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
    this.updateFavorites();
  }

  handleAddFav = async (musicObj) => {
    const { favoriteSongs } = this.state;
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
    const isFavorite = favoriteSongs.some((data) => data.trackId === musicObj.trackId);
    if (isFavorite) { await removeSong(musicObj); } else { await addSong(musicObj); }
    await this.updateFavorites();
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  }

  // todo: mudar variavel para update fav
  updateFavorites = async () => {
    const data = await getFavoriteSongs();
    this.setState({ favoriteSongs: [...data] });
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const allMusicData = await getMusics(id);
    this.setState({ musicData: [...allMusicData] });
  }

  renderMusicPreview = () => {
    const { musicData, favoriteSongs } = this.state;
    const favData = favoriteSongs.map((data) => (data.trackId));
    const previewUrlData = musicData.slice(1)
      .map((data) => ({
        previewUrl: data.previewUrl,
        trackName: data.trackName,
        trackId: data.trackId,
      }));

    return previewUrlData.map((data) => {
      const isFavorite = favData.includes(data.trackId);
      return (
        <MusicCard
          { ...data }
          favSongs={ favoriteSongs }
          isChecked={ isFavorite }
          key={ data.trackName }
          onClick={ this.handleAddFav }
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

import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favSongs: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.updateFavorites();
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
    }));
  }

  updateFavorites = async () => {
    const data = await getFavoriteSongs();
    this.setState({ favSongs: data });
  }

  removeFavorite = async (songObj) => {
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
    }), async () => {
      await removeSong(songObj);
      await this.updateFavorites();
      this.setState((prevState) => ({
        isLoading: !prevState.isLoading,
      }));
    });
  }

  renderAudioTracks = () => {
    const { favSongs } = this.state;
    return favSongs.map((song) => (
      <MusicCard
        isChecked={ !!'true' }
        key={ song.trackId }
        data={ song }
        onClick={ this.removeFavorite }
        flex="center"
        image="true"
      />
    ));
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="favorites-container">
          <h2>Músicas favoritas:</h2>
          {isLoading ? (<Loading />) : (
            this.renderAudioTracks()
          ) }
        </div>
      </>
    );
  }
}

export default Favorites;

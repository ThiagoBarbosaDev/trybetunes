import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    this.handleGetFav();
  }

  // componentDidUpdate() {
  //   this.handleGetFav();
  // acusa erro de memoryleak
  // }

  handleAddFav = async (musicObj) => {
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
    await addSong(musicObj).then(() => this.handleGetFav());
    this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
  }

  handleGetFav = async () => {
    const data = await getFavoriteSongs();
    this.setState(((prevState) => (
      { favoriteSongs: [...prevState.favoriteSongs, ...data] }
    )));
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const allMusicData = await getMusics(id);
    this.setState({ musicData: [...allMusicData] });
    // console.log(allMusicData[0]);
    // console.log(allMusicData[0].artistName);
  }

  renderMusicPreview = () => {
    const { musicData, favoriteSongs } = this.state;
    // console.log(musicData[1].trackId);
    // console.log(musicData[1]?.trackId);
    // musicData ? console.log(musicData[1].trackId) : console.log('nope');
    const favData = favoriteSongs.map((data) => (data.trackId));
    const previewUrlData = musicData.slice(1)
      .map((data) => ({
        previewUrl: data.previewUrl,
        trackName: data.trackName,
        trackId: data.trackId,
      }));

    return previewUrlData.map((data) => {
      const isFavorite = favData.includes(data.trackId);
      // console.log(isFavorite);
      // console.log(isFavorite.trackId);
      return (
        <MusicCard
          { ...data }
          favSongs={ favoriteSongs }
          isChecked={ isFavorite }
          // teste={ isFavorite }
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
    // <>
    //   <Header />
    //   {isLoading && <Loading />}
    //   <>
    //     <div>
    //       { this.renderMusicPreview()}
    //     </div>
    //     <div data-testid="page-album">
    //       <h2 data-testid="artist-name">
    //         { musicData[0]?.artistName }
    //       </h2>
    //       <h3 data-testid="album-name">
    //         { musicData[0]?.collectionName }
    //       </h3>
    //     </div>
    //   </>

      // </>
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

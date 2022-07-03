import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import TrackCard from '../components/TrackCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicData: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const { musicData } = this.state;
    const allMusicData = await getMusics(id);
    this.setState({ musicData: [...allMusicData] });
    return musicData;
  }

  renderMusicPreview = () => {
    const { musicData } = this.state;
    const previewUrlData = musicData.slice(1)
      .map((data) => ({ previewUrl: data.previewUrl, trackName: data.trackName }));
    return previewUrlData.map((data) => (
      <TrackCard { ...data } key={ data.trackName } />
    ));
  }

  render() {
    const { musicData } = this.state;

    return (
      <>
        <Header />
        <div>
          {this.renderMusicPreview()}
        </div>
        <div data-testid="page-album">
          <h2 data-testid="artist-name">
            { musicData[0]?.artistName }
          </h2>
          <h3 data-testid="album-name">
            { musicData[0]?.collectionName }
          </h3>
          {/* { musicData[0] {} ?  : <div>Nenhum álbum foi encontrado</div>} */}
        </div>
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

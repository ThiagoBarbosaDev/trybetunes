import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isChecked: false,
  //   };
  // }

  // componentDidMount() {
  //   this.handleCheckboxCheck();
  // }

  // handleCheckboxCheck = async () => {
  //   const { data: { trackId } } = this.props;
  //   const fetchData = await getFavoriteSongs();
  //   const handleData = fetchData.some((data) => data.trackId === trackId);
  //   this.setState({ isChecked: handleData });
  // }

  render() {
    const { onClick, data, isChecked } = this.props;
    // const { isChecked } = this.state;
    console.log(isChecked);
    return (
      <div>
        <audio data-testid="audio-component" src={ data.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {data.trackName}
        <Input
          name="favCheckbox"
          type="checkbox"
          checked={ isChecked }
          dataTestId={ `checkbox-music-${data.trackId}` }
          onChange={ () => onClick(data) }
        >
          Favorita
        </Input>
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;

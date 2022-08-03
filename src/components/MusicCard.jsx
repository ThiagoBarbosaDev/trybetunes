import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import './musiccard.css';

class MusicCard extends React.Component {
  render() {
    const { onClick, data, isChecked, flex, image } = this.props;
    return (
      <div className={ `music-card-wrapper ${flex}` }>
        {image && <img src={ data?.artworkUrl100 } alt="album" />}
        <p className="track-name">{data.trackName}</p>
        <audio data-testid="audio-component" src={ data.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <Input
          className="favorite-checkbox"
          name={ `favCheckbox${data.trackId}` }
          type="checkbox"
          checked={ isChecked }
          dataTestId={ `checkbox-music-${data.trackId}` }
          onChange={ () => onClick(data) }
        >
          { isChecked ? '💚' : '🖤' }
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
    artworkUrl100: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  flex: PropTypes.string.isRequired,
  image: PropTypes.string,
};

MusicCard.defaultProps = {
  image: '',
};

export default MusicCard;

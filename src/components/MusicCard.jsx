import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

class MusicCard extends React.Component {
  render() {
    const { onClick, data, isChecked } = this.props;

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
          name={ `favCheckbox${data.trackId}` }
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

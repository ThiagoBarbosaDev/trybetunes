import React from 'react';
import PropTypes from 'prop-types';

class TrackCard extends React.Component {
  render() {
    const { previewUrl, trackName } = this.props;
    return (
      <div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {trackName}
      </div>
    );
  }
}

TrackCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default TrackCard;

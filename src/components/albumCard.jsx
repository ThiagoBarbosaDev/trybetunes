import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { data: { collectionId, artistName, artworkUrl100,
      collectionName } } = this.props;
    return (
      <div className="album-card">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <p>{artistName}</p>
          <img src={ artworkUrl100 } alt={ artistName } />
          <p>{collectionName}</p>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  data: PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
  }),
};

AlbumCard.defaultProps = {
  data: [],
};

export default AlbumCard;

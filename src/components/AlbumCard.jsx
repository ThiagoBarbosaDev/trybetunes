import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './albumcard.css';

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
          <img src={ artworkUrl100 } alt={ artistName } />
          <div className="album-card__info">
            <p className="album-card__artist-name">{artistName}</p>
            <p className="album-card__collection-name">{collectionName}</p>
          </div>
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

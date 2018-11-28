import PropTypes from "prop-types"
import React from 'react';
import Touchable from 'rc-touchable';

class ArtistColumnPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    artist: PropTypes.array.isRequired,
  }

  navigateToArtist = (id) => {
    window.location = `/artist/${id}`;
  }

  render() {
    let artist = this.props.artist;
    return (
      <div className="mb3 pa3 w-100 artist-item bg-white relative" key={artist.id}>
        <div className="item-overlay">
          {this.props.children}
        </div>
        <Touchable onPress={() => this.navigateToArtist(artist.id)}>
          {<img src={""} className="mb3 pointer" />}
        </Touchable>
        <Touchable onPress={() => this.navigateToArtist(artist.id)}>
          <h3 className="pointer">{artist.name}</h3>
        </Touchable>
        <h6>{artist.artist_name}</h6>
        <h6 className="i">{artist.program}</h6>
      </div>
    );
  }
}

export default ArtistColumnPanel;

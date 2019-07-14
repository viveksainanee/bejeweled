import React, { Component } from 'react';
import uuid from 'uuid/v4';
import img00 from './assets/00.png';
import img01 from './assets/01.png';
import img02 from './assets/03.png';
import img03 from './assets/02.png';
import img04 from './assets/04.png';
import img05 from './assets/05.png';
import img06 from './assets/06.png';

class Row extends Component {
  render() {
    // this is an array of gem images
    let imageFiles = [img00, img01, img02, img03, img04, img05, img06];

    // this takes the id from the board state and turns it into an image
    let images = this.props.gems.map(id => (
      <img
        src={imageFiles[id]}
        alt="gem"
        height="60px"
        width="60px"
        key={uuid()}
      />
    ));

    return <div>{images}</div>;
  }
}

export default Row;

import React, { Component } from 'react';
import img00 from './assets/sport_00.png';
import img01 from './assets/sport_01.png';
import img02 from './assets/sport_03.png';
import img03 from './assets/sport_02.png';
import img04 from './assets/sport_04.png';
import img05 from './assets/sport_05.png';
import img06 from './assets/sport_06.png';

class Row extends Component {
  render() {
    // this is an array of gem images
    let imageFiles = [img00, img01, img02, img03, img04, img05, img06];

    // this takes the id from the board state and turns it into an image
    let imageComponents = this.props.row.map(id => (
      <img src={imageFiles[id]} alt="gem" />
    ));

    return <div>{imageComponents}</div>;
  }
}

export default Row;

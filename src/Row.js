import React, { Component } from 'react';
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
    let imageComponents = this.props.cells.map(id => (
      <img src={imageFiles[id]} alt="gem" />
    ));

    // return <div>{this.props.cells}</div>;
    return <div>{imageComponents}</div>;
  }
}

export default Row;

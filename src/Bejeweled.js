import React, { Component } from 'react';
import './Bejeweled.css';
import Board from './Board';

class Bejeweled extends Component {
  render() {
    return (
      <div id="bejeweled">
        <h1>Bejeweled</h1>
        <Board numberOfColors={7} boardRows={8} boardCols={8} />
      </div>
    );
  }
}

export default Bejeweled;

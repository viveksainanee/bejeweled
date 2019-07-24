import React, { Component } from 'react';
import './Bejeweled.css';
import Board from './Board';

class Bejeweled extends Component {
  render() {
    return (
      <div id="bejeweled">
        <h1>Bejeweled</h1>
        {/* Must have at least 3 colors (max 7), and at least 3 rows and col */}
        <Board numberOfColors={7} boardRows={8} boardCols={8} />
      </div>
    );
  }
}

export default Bejeweled;

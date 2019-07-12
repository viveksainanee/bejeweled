import React, { Component } from 'react';
import Row from './Row';
const BOARD_ROWS = 3;
const BOARD_COLS = 3;
const NUMBER_OF_COLORS = 3;

class Board extends Component {
  constructor(props) {
    super(props);

    // Initialize a board to be able to create the
    // board's initial state
    let board = [];

    // Inserts values into the board (as a 2D grid)
    // of values from 0 to NUMBER_OF_COLORS-1.
    for (let row = 0; row < BOARD_ROWS; row++) {
      let rowValues = [];
      for (let col = 0; col < BOARD_COLS; col++) {
        // pushes a random number in
        rowValues.push(Math.floor(Math.random() * NUMBER_OF_COLORS));
      }
      board.push(rowValues);
    }

    this.state = {
      // This board represents a 2D grid, like so:
      // [[2], [0],... [1]
      //  [1], [2],... [1]
      //  ...
      //  [1], [0],... [2]]
      board
    };
  }

  render() {
    let rows = this.state.board.map(row => <Row row={row} />);
    return <div>{rows}</div>;
  }
}

export default Board;

import React, { Component } from 'react';
import Row from './Row';
const BOARD_ROWS = 3;
const BOARD_COLS = 3;
const NUMBER_OF_COLORS = 3;

class Board extends Component {
  constructor(props) {
    super(props);
    let board = createBoard();

    this.state = {
      // This board represents a 2D grid, like so:
      // [[2, 0,... 1]
      //  [1, 2,... 1]
      //  ...
      //  [1, 0,... 2]]
      board
    };
  }

  createBoard() {
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
  }

  // Why make this as a function instead of with the initial create?
  // This function would need to be called with every playerMove anyway
  // To avoid redundant code in the constructor, this function can be created
  // here and called on the creation of the board.

  checkMatches() {
    let checkVertical = function(row, col) {
      let matchedCells = 1;
      let cellsSeen = [[row, col]];
      let rowToCheck = row + 1;
      while (
        row < BOARD_ROWS &&
        this.state.board[rowToCheck][col] === this.this.state.board[row][col]
      ) {}
    };

    // for every gem, check down and right
    // (up and left would be redundant checks)
    for (let row = 0; row < BOARD_ROWS; row++) {
      for (let col = 0; col < BOARD_COLS; col++) {
        checkVertical(row, col);
      }
    }
  }

  render() {
    let rows = this.state.board.map(rowData => <Row cells={rowData} />);
    return <div>{rows}</div>;
  }
}

export default Board;

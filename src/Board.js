import React, { Component } from 'react';
import Row from './Row';
const BOARD_ROWS = 8;
const BOARD_COLS = 8;
const NUMBER_OF_COLORS = 7;

class Board extends Component {
  constructor(props) {
    super(props);

    let board = this.createBoard();

    this.state = {
      // This board represents a 2D grid of image ids
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
        rowValues.push(this.newGemValue(board, row, col));
      }
      board.push(rowValues);
    }
    return board;
  }

  newGemValue(board, row, col) {
    let gemCandidateID = Math.floor(Math.random() * NUMBER_OF_COLORS);
    // Ensures it won't be a match on insertion
    let valueTwoAbove = row - 2 >= 0 ? board[row - 2][col] : null;
    let valueTwoLeft = col - 2 >= 0 ? board[row][col - 2] : null;
    while (
      gemCandidateID === valueTwoAbove ||
      gemCandidateID === valueTwoLeft
    ) {
      gemCandidateID = Math.floor(Math.random() * NUMBER_OF_COLORS);
    }
    return gemCandidateID;
  }

  render() {
    let rows = this.state.board.map(rowData => <Row gems={rowData} />);
    return <div>{rows}</div>;
  }
}

export default Board;

// // Why make this as a function instead of with the initial create?
//   // This function would need to be called with every playerMove anyway
//   // To avoid redundant code in the constructor, this function can be created
//   // here and called on the creation of the board.

//   checkMatches() {
//     let checkVertical = function(row, col) {
//       let matchedCells = 1;
//       let cellsSeen = [[row, col]];
//       let rowToCheck = row + 1;
//       while (
//         row < BOARD_ROWS &&
//         this.state.board[rowToCheck][col] === this.this.state.board[row][col]
//       ) {}
//     };

//     // for every gem, check down and right
//     // (up and left would be redundant checks)
//     for (let row = 0; row < BOARD_ROWS; row++) {
//       for (let col = 0; col < BOARD_COLS; col++) {
//         checkVertical(row, col);
//       }
//     }
//   }

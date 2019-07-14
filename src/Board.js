import React, { Component } from 'react';
import Row from './Row';
import uuid from 'uuid/v4';

const BOARD_ROWS = 4;
const BOARD_COLS = 4;
const NUMBER_OF_COLORS = 4;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: []
    };
  }

  componentDidMount() {
    let board = this.createBoard();
    board = this.removeMatches(board);
    this.setState({ board });
  }

  // Inserts values into the board (as a 2D grid)
  // of values from 0 to NUMBER_OF_COLORS-1.
  createBoard() {
    let board = [];
    for (let row = 0; row < BOARD_ROWS; row++) {
      let rowValues = [];
      for (let col = 0; col < BOARD_COLS; col++) {
        rowValues.push(Math.floor(Math.random() * NUMBER_OF_COLORS));
      }
      board.push(rowValues);
    }
    return board;
  }

  removeMatches(board) {
    for (let row = 0; row < BOARD_ROWS; row++) {
      for (let col = 0; col < BOARD_COLS; col++) {
        while (
          (board[row - 2] && board[row - 2][col] === board[row][col]) ||
          board[row][col - 2] === board[row][col]
        ) {
          board[row][col] = Math.floor(Math.random() * NUMBER_OF_COLORS);
        }
      }
    }
    return board;
  }

  render() {
    let rows = this.state.board.map(rowData => (
      <Row key={uuid()} gems={rowData} />
    ));

    return (
      <div>
        {rows}
        <button>New game</button>
      </div>
    );
  }
}

export default Board;

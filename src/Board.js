import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { Button } from 'reactstrap';
import Row from './Row';

const BOARD_ROWS = 8;
const BOARD_COLS = 8;
const NUMBER_OF_COLORS = 7;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      errors: [],
      board: []
    };
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  componentDidMount() {
    try {
      // Creates board, without any pre-existing matches
      let board = this.createBoard();
      board = this.removeMatches(board);

      this.setState({ board, isLoading: false }); // async
    } catch (err) {
      // Puts any errors in state
      this.setState(st => ({ errors: [...st.errors, err] }));
    }
  }

  // Inserts values into the board (as a 2D grid)
  // of values from 0 to NUMBER_OF_COLORS-1 (used for img ids)
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

  // Replace existing matches of three
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

  // Resets state for New Game Button
  handleNewGame() {
    let board = this.createBoard();
    board = this.removeMatches(board);
    this.setState({ board });
  }

  render() {
    if (this.state.isLoading) {
      return <h2>Loading...</h2>;
    }

    if (this.state.errors.length > 0) {
      console.log(this.state.errors);
      return <div>{`Oh no! There is an error!`}</div>;
    }

    let rows = this.state.board.map(rowData => (
      <Row key={uuid()} gems={rowData} />
    ));

    return (
      <div>
        {rows}
        <Button onClick={this.handleNewGame} color="success">
          New Game
        </Button>
      </div>
    );
  }
}

export default Board;

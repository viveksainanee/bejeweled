import React, { Component } from 'react';
import uuid from 'uuid/v4';
import Row from './Row';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfColors: this.props.numberOfColors,
      boardRows: this.props.boardRows,
      boardCols: this.props.boardCols,
      isLoading: true,
      errors: [],
      board: []
    };
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  componentDidMount() {
    try {
      // Creates board, without any pre-existing matches
      if (this.state.numberOfColors > 1) {
        let board = this.createBoard();
        board = this.makeBoardValid(board);
        this.setState({ board, isLoading: false }); // async
      } else {
        throw new Error('Number of colors must be > 1');
      }
    } catch (err) {
      // Puts any errors in state
      this.setState(st => ({ isLoading: false, errors: [...st.errors, err] }));
    }
  }

  // Inserts values into the board (as a 2D grid)
  // of values from 0 to this.state.numberOfColors-1 (used for img ids)
  createBoard() {
    let board = [];
    for (let row = 0; row < this.state.boardRows; row++) {
      let rowValues = [];
      for (let col = 0; col < this.state.boardCols; col++) {
        rowValues.push(Math.floor(Math.random() * this.state.numberOfColors));
      }
      board.push(rowValues);
    }

    return board;
  }

  makeBoardValid(board) {
    // Part 1: Ensure a valid move
    // Find a spot on board
    let randomRow = Math.floor(Math.random() * (this.state.boardRows - 2));
    let randomCol = Math.floor(Math.random() * (this.state.boardCols - 1));
    // Pick a random color
    let randomColor = Math.floor(Math.random() * this.state.numberOfColors);
    // Insert into the board
    board[randomRow][randomCol] = randomColor;
    board[randomRow + 1][randomCol] = randomColor;
    board[randomRow + 2][randomCol + 1] = randomColor;
    // block these coordinates during randomization
    let blockedCoords = new Set();
    blockedCoords.add(`${randomRow},${randomCol}`);
    blockedCoords.add(`${randomRow + 1},${randomCol}`);
    blockedCoords.add(`${randomRow + 2},${randomCol + 1}`);

    // Part 2: Remove matches
    for (let row = 0; row < this.state.boardRows; row++) {
      for (let col = 0; col < this.state.boardCols; col++) {
        if (!blockedCoords.has(`${row},${col}`)) {
          let attempt = 0;
          while (
            (board[row - 2] && board[row - 2][col] === board[row][col]) ||
            board[row][col - 2] === board[row][col]
          ) {
            if (attempt < 100) {
              board[row][col] = Math.floor(
                Math.random() * this.state.numberOfColors
              );
              attempt++;
            } else {
              throw new Error(
                'Attempted to remove matches 100 times - Please check the code'
              );
            }
          }
        }
      }
    }
    return board;
  }

  // Resets state for New Game Button
  handleNewGame() {
    let board = this.createBoard();
    board = this.makeBoardValid(board);
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
        <button
          style={{
            backgroundColor: '#228B22',
            color: 'white',
            width: '150px',
            height: '50px',
            fontSize: '24px',
            borderRadius: '50px',
            margin: '10px'
          }}
          onClick={this.handleNewGame}
          color="success"
        >
          New Game
        </button>
      </div>
    );
  }
}

export default Board;

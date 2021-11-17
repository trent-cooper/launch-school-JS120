// Tic Tac Toe is a 2-player game
// A 3x3 Board with 9 spaces is used
// Players take turns selecting a space to make with a marker
//  that identifies the player.
// The first player uses the marker X, the second player uses O
// The first player to mark 3 consecutive spaces in a row wins.
//    Winning lines include: horizontal line, vertical line, and diagonal line
// For this implitation there is 1 human player, 1 computer player
// The human player goes first

// Nouns: player, game, board, space (square), marker, row, human, computer
// Verbs: select (mark), play

// Object Structure
// (n) Game
// (n) Board
// (n) Row
// (n) Space (Square)
// (n) Marker
// (n) Player
//    (v) Play
//    (v) Select (Mark)
//    (n) Human
//    (n) Computer


/////////


let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    // Need to keep track of Square's marker
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[counter] = new Square();
    }
  }

  display() {
    console.log('');
    console.log('     |     |');
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log('     |     |');
    console.log('');
  }

  displayWithClear() {
    console.clear();
    console.log('');
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(square => this.squares[square].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    // Need 2 players and a board
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],
    [ "4", "5", "6" ],
    [ "7", "8", "9" ],
    [ "1", "4", "7" ],
    [ "2", "5", "8" ],
    [ "3", "6", "9" ],
    [ "1", "5", "9" ],
    [ "3", "5", "7" ],
  ];

  play() {
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congrats!");
    } else if (this.isWinner(this.computer)) {
      console.log("I, the computer, have won.");
    } else {
      console.log('A tie game. How boring.');
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      choice = readline.question(`Choose a Square: (${this.joinOr(validChoices)}): `);
      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  joinOr(choices, delim = ', ', conj = 'or') {
    let length = choices.length;

    if (length === 1) {
      return choices;
    }

    return choices.slice(0, length - 1).join(delim) +
           ' ' + conj + ' ' +
           choices[length - 1];
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}

let game = new TTTGame();
game.play();
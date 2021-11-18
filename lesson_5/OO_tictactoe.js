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

  displayWithClear(humanScore, compScore) {
    console.clear();
    console.log(`Current Game Score | Human: ${humanScore} Computer: ${compScore}`);
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
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  addScore() {
    this.score += 1;
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
    this.round = 0;
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

  static WINNING_SCORE = 3;

  play() {
    this.displayWelcomeMessage();
    this.playMatch();
    this.displayGoodbyeMessage();
  }

  // play() {
  //   this.displayWelcomeMessage();

  //   while (true) {
  //     this.playRound();
  //     if (this.gameOver()) {
  //       this.displayGameResults();
  //       break;
  //     }
  //     if (!this.playAgain()) break;
  //     console.clear();
  //     console.log('Here we go again.. First player to 3 wins!');
  //   }

  //   this.displayGoodbyeMessage();
  // }

  playMatch() {
    while (true) {
      this.playRound();
      if (this.gameOver()) {
        this.displayGameResults();
        break;
      }
      if (!this.playAgain()) break;
      console.clear();
      console.log('Here we go again.. First player to 3 wins!');
    }
  }

  playRound() {
    this.resetGame();
    this.board.display();
    while (true) {
      if (this.turnCheck() === 'human') {
        this.humanMoves();
        if (this.roundOver()) break;
  
        this.computerMoves();
        if (this.roundOver()) break;
          
      } else if (this.turnCheck() === 'computer') {
        this.computerMoves();
        if (this.roundOver()) break;
        this.board.displayWithClear(this.human.score, this.computer.score);

        this.humanMoves();
        if (this.roundOver()) break;        
      }
    
      this.board.displayWithClear(this.human.score, this.computer.score);
    }

    this.incrementScore();
    this.board.displayWithClear(this.human.score, this.computer.score);
    this.displayRoundResults();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(`Welcome to Tic Tac Toe! First Player to ${TTTGame.WINNING_SCORE} wins the game.`);
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  displayRoundResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congrats!");
    } else if (this.isWinner(this.computer)) {
      console.log("I, the computer, have won.");
    } else {
      console.log('A tie game. How boring.');
    }
  }

  displayGameResults() {
    if (this.human.getScore() === TTTGame.WINNING_SCORE) {
      console.log(`You're the first to ${TTTGame.WINNING_SCORE} wins! Congratulations, you win!`);
    } else if (this.computer.getScore() === TTTGame.WINNING_SCORE) {
      console.log(`The computer beat you to ${TTTGame.WINNING_SCORE} wins.. Better luck next time!`);
    }
  }

  gameOver() {
    if (this.human.getScore() === TTTGame.WINNING_SCORE || this.computer.getScore() === TTTGame.WINNING_SCORE) {
      return true;
    }

    return false;
  }

  incrementScore() {
    if (this.isWinner(this.human)) {
      this.human.addScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.addScore();
    }
  }

  playAgain() {
    let choice;

    while (true) {
      choice = readline.question('Would you like to keep going? (Y/N): ');
      if (['y', 'n'].includes(choice.toLowerCase())) break;
      console.log('This is not a valid response.');
      console.log('');
    }

    return choice.toLowerCase() === 'y';
  }

  resetGame() {
    this.board = new Board();
    this.incrementRound();
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

  computerMoves() {
    let choice = this.checkBoardMoves(this.computer);

    if (!choice) {
      choice = this.checkBoardMoves(this.human);
    }

    if (!choice) {
      choice = this.pickCenter();
    }

    if (!choice) {
      choice = this.pickRandom();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  pickCenter() {
    return this.board.squares[5].isUnused() ? '5' : null;
  }

  pickRandom() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));

    return choice;
  }

  checkBoardMoves(player) {
    let key;
    TTTGame.POSSIBLE_WINNING_ROWS.forEach(row => {
      if (this.checkSquareRisk(row, player)) {
        key = this.checkSquareRisk(row, player);
      }
    });
    if (key) return key;

    return null;
  }

  checkSquareRisk(row, player) {
    if (this.board.countMarkersFor(player, row) === 2) {
      let filterRow = row.filter(key => this.board.squares[key].isUnused());
      if (filterRow.length === 1) return filterRow[0];
    }

    return null;
  }

  roundOver() {
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

  turnCheck() {
    if (this.getRound() % 2 !== 0) {
      return 'human';
    } else {
      return 'computer';
    }
  }

  incrementRound() {
    this.round += 1;
  }

  getRound() {
    return this.round;
  }
}

let game = new TTTGame();
game.play();
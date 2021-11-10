// High Level Flow:
//    User makes a choice
//    Computer makes a choice
//    Winner is displayed

// Textual Description:

// 2 players select 1 of 3 moves: rock, paper or scissors.
// A winner is decided based on the following rules when comparing selections:
// Rock beats scissors
// Scissors beat paper
// Paper beats rock
// If the players select the same move, it's a tie
// If a player wins, they're score increases by 1
// If a player scores 5, they win the game

// Nouns: Player, Moves (rock/paper/scissor), Rules
// Verbs: Chooses/Selects, Compares

// Player
//    - Chooses
// Score
// Moves
// Rules
// - Compare

const readline = require('readline-sync');

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
    console.log('First Player to 5 rounds won is the winner!')
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing!');
  },

  displayScore() {
    console.log(`The Current Score Is:`);
    console.log(`Human: ${this.human.score} | Computer: ${this.computer.score}`);
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let compMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && compMove === 'scissors') ||
        (humanMove === 'paper' && compMove === 'rock') ||
        (humanMove === 'scissors' && compMove === 'paper')) {
      console.log('You win!');
      this.human.score += 1;
      this.displayScore();
    } else if ((humanMove === 'rock' && compMove === 'paper') ||
               (humanMove === 'paper' && compMove === 'scissors') ||
               (humanMove === 'scissors' && compMove === 'rock')) {
      console.log('Computer wins!');
      this.computer.score += 1;
      this.displayScore();
    } else {
      console.log(`It's a tie!`);
      this.displayScore();
    }
  },

  displayGameWinner() {
    if (this.human.score === 5) {
      console.log('You win the game!');
    } else if (this.computer.score === 5) {
      console.log('The computer wins this time, better luck next time!');
    }
  },

  checkGameWinner() {
    return (this.human.score === 5 || this.computer.score === 5);
  },

  playAgain() {
    let answer;

    while (true) {
      answer = readline.question('Would you like to keep going? (Y/N): ').toUpperCase();
      if (['Y', 'N'].includes(answer)) break;
      console.log("That's not a valid response, please try again.");
    }

    return answer === 'Y';
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      while (true) {
        console.clear();
        this.human.choose();
        this.computer.choose();
        this.displayRoundWinner();
        if (this.checkGameWinner()) break;
        if (!this.playAgain()) break;
      }

      console.clear();
      this.displayGameWinner();
      if (!this.playAgain()) break;
   }

    this.displayGoodbyeMessage();
  },
};

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    move: null,

    choose() {
      let choice;

      while (true) {
        choice = readline.question('Please choose rock, paper or scissors: ').toLowerCase();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, that\'s an invalid choice, please try again.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    move: null,

    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIdx = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIdx];
    }
  };

  return Object.assign(playerObject, computerObject);
}


RPSGame.play();
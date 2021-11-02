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

// Nouns: Player, Moves (rock/paper/scissor), Rules
// Verbs: Chooses/Selects, Compares

// Player
//    - Chooses
// Moves
// Rules
// - Compare

const readline = require('readline-sync');

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing!');
  },

  displayWinner() {
    let humanMove = this.human.move;
    let compMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && compMove === 'scissors') ||
        (humanMove === 'paper' && compMove === 'rock') ||
        (humanMove === 'scissors' && compMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && compMove === 'paper') ||
               (humanMove === 'paper' && compMove === 'scissors') ||
               (humanMove === 'scissors' && compMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log(`It's a tie!`);
    }
  },

  playAgain() {
    let answer;

    while (true) {
      answer = readline.question('Would you like to play again? (Y/N): ').toUpperCase();
      if (['Y', 'N'].includes(answer)) break;
      console.log("That's not a valid response, please try again.");
    }

    return answer === 'Y';
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

function createPlayer() {
  return {
    move: null,
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
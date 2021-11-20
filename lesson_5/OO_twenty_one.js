// Tic Tac Toe is a 2-player game
// There is a human player and a computer dealer
// Game is played with a 52-card deck
// The deck has 4 suits, with 13 values for each suit
// Dealer and player are dealt a hand of 2 cards
// The player can see both cards, but only 1 dealer card
// The goal is to get as close to 21 total card value without going over 21
// The player goes first and can choose to hit (receive another card)
//    or stay (keep hand as-is)
// Going over 21 is an automatic loss (bust)
// The dealer automatically hits if their hand is under 17
// The dealer automatically stays if their hand is 17+

// Additional Requirements:
//	Display welcome and goodbye messages appropriately
//	Display during player turn (update each hit/stay):
//		Computer's hand (1 card hidden)
//		Player's hand + current point total
//	Display during computer's turn:
//		Don't play if player busted
//		Display entire hand when turn begins, and show hand total
//		Continue to update hand and total after each hit.
//		Display results when dealer stay
//	Ask player to play again after round.
//	Player beins with 5 dollars
//		Player loses 1 dollar for each loss
//		Player gains 1 dollar for each win
//		Game ends if dollars hits 0 (loss) or hits 10 (win)
//	Must deal with cards running out.

// Nouns: game, hand, dealer, player, deck, card, suit, value
// Verbs: hit, stay, bust, deal, play, hide, reveal

// Object Structure
// (n) Game
//		(v) play
// (n) Deck
	// (n) Card
// (n) Hand
// (n) Participant
//		(v) Hit
//		(v) Stay
//		(s) Bust
	// (n) Dealer
	//		(v) Hide
	//		(v) Reveal
	//		(v) Deal
	//		(s) Score
	// (n) Player
	//		(s) Score


////////
const readline = require('readline-sync');

class Deck {
  static STANDARD_DECK = [
    ['H', '2'], ['D', '2'], ['C', '2'], ['S', '2'],
    ['H', '3'], ['D', '3'], ['C', '3'], ['S', '3'],
    ['H', '4'], ['D', '4'], ['C', '4'], ['S', '4'],
    ['H', '5'], ['D', '5'], ['C', '5'], ['S', '5'],
    ['H', '6'], ['D', '6'], ['C', '6'], ['S', '6'],
    ['H', '7'], ['D', '7'], ['C', '7'], ['S', '7'],
    ['H', '8'], ['D', '8'], ['C', '8'], ['S', '8'],
    ['H', '9'], ['D', '9'], ['C', '9'], ['S', '9'],
    ['H', '10'], ['D', '10'], ['C', '10'], ['S', '10'],
    ['H', 'J'], ['D', 'J'], ['C', 'J'], ['S', 'J'],
    ['H', 'Q'], ['D', 'Q'], ['C', 'Q'], ['S', 'Q'],
    ['H', 'K'], ['D', 'K'], ['C', 'K'], ['S', 'K'],
    ['H', 'A'], ['D', 'A'], ['C', 'A'], ['S', 'A'],
  ];

	constructor() {
    this.deck = Deck.STANDARD_DECK.slice();
	}

	dealHand(participant) {
    participant.hand.push(this.deck.pop());
    participant.hand.push(this.deck.pop());
	}

  hit(participant) {
    participant.hand.push(this.deck.pop());
  } 

  shuffle() {
    for (let idx = this.deck.length - 1; idx > 0; idx--) {
      let otherIdx = Math.floor(Math.random() * (idx + 1));
      [this.deck[idx], this.deck[otherIdx]] = [this.deck[otherIdx], this.deck[idx]];
    }
  }

  resetDeck() {
    this.deck = Deck.STANDARD_DECK.slice();
  }
}

class Participant {
	constructor() {
    this.hand = [];
    this.score = 0;
	}

	isBusted() {
    if (this.getHandValue() > TwentyOneGame.TOP_SCORE) {
      return true;
    }

    return false;
	}

  score() {

  }

  getScore() {
    return this.score;
  }

  displayHand() {
    let cardLine = ['', '', '', ''];
    let handCopy = this.hand.slice('');
    if (this.cardHide === true) {
      handCopy[0] = ['?', '?'];
    }
  
    handCopy.forEach(card => {
      cardLine[0] += '  ---------  ';
      if (card[1] === '10') {
        cardLine[1] += ` |${card[1]}     ${card[1]}| `;
      } else {
        cardLine[1] += ` |${card[1]}       ${card[1]}| `;
      }
      cardLine[2] += ' |         | ';
      cardLine[3] += ` |    ${card[0]}    | `;
    });
  
    console.log(cardLine[0]);
    console.log(cardLine[1]);
    console.log(cardLine[2]);
    console.log(cardLine[3]);
    console.log(cardLine[2]);
    console.log(cardLine[1]);
    console.log(cardLine[0]);
    console.log('');
  }

  displayInfo() {
    if (this.constructor === Dealer) {
      console.log(`Current Hand Total: ${this.cardHide ? '??' : this.getHandValue()}`);
    } else {
      console.log(`Current Hand Total: ${this.getHandValue()} | Current Money: ${this.moneyInWallet()}`);
    }
  }

  getHandValue() {
    let values = this.hand.map(card => card[1]);

    let sum = 0;
    values.forEach(value => {
      if (value === 'A') {
        sum += 11;
      } else if (['J', 'Q', 'K'].includes(value)) {
        sum += 10;
      } else if (value !== '?') {
        sum += Number(value);
      }
    });
  
    values.filter(value => value === 'A').forEach(_ => {
      if (sum > TwentyOneGame.TOP_SCORE) sum -= 10;
    });
  
    return sum; 
  }

  clearHand() {
    this.hand = [];
  }
}

class Player extends Participant {
	constructor() {
    // Money available
    // Hand
    // Score
    super();
    this.money = TwentyOneGame.STARTING_MONEY;
  }

  winDollar() {
    this.money += 1;
  }

  loseDollar() {
    this.money -= 1;
  }

  moneyInWallet() {
    return this.money;
  }
}

class Dealer extends Participant {
	constructor() {
    // Hand
    // Score
    super();
    this.cardHide = true;
  }

  hide() {
    this.cardHide = true;
  }

  reveal() {
    this.cardHide = false;
  }

  checkUnder17() {
    return this.getHandValue() < 17;
  }
}

class TwentyOneGame {
  static TOP_SCORE = 21;
  static MIN_MONEY = 0;
  static MAX_MONEY = 10;
  static STARTING_MONEY = 5;

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  play() {
    this.displayWelcomeMessage();
    this.playHand();
    this.displayGoodbyeMessage();
  }

  playHand() {
    while (true) {
      this.setUpTable();
      this.initializeDeck();
      this.dealCards();
      this.displayTable();
      this.playerTurn();
      if (!this.player.isBusted()) {
        this.dealerTurn();
      }
      this.displayResults();
      if (this.checkMoney() === true) {
        this.displayBrokeOrRich();
        break;
      }
      if (this.playAgainPrompt() === 'n') break;
    }
  }

  setUpTable() {
    this.player.clearHand();
    this.dealer.clearHand();
    this.dealer.hide();
  }

  initializeDeck() {
    this.deck.resetDeck();
    this.deck.shuffle();
  }

  dealCards() {
    this.deck.dealHand(this.player);
    this.deck.dealHand(this.dealer);
  }

  displayTable() {
    console.clear();
    console.log('');
    console.log('-DEALER-');
    this.dealer.displayInfo();
    this.dealer.displayHand();
    console.log('*-*'.repeat(20));
    console.log('');
    console.log('-PLAYER-');
    this.player.displayInfo();
    this.player.displayHand();
  }

  playerTurn() {
    this.playerPrompt();

    if (this.player.isBusted()) {
      console.log('Oh no! You busted :( Better Luck next hand.')
    } else {
      console.log(`You chose to stay - Your Current Hand Total: ${this.player.getHandValue()}`);
      this.continuePrompt();
    }
  }

  playerPrompt() {
    let answer;
    while (true) {
      console.log("(H)it or (S)tay?");
      answer = readline.question().toLowerCase()[0];
      if (['h', 's'].includes(answer)) break;
      console.log("That's not a valid response, please try again.")
    }

    if (answer === 'h') {
      this.deck.hit(this.player);
      this.displayTable();
      if (this.player.isBusted()) return;
      this.playerPrompt();
    }
  }

  dealerTurn() {
    this.dealer.reveal();
    this.displayTable();
    this.dealerAutoHit();

    if (this.dealer.isBusted()) {
      console.log("The dealer has busted - You win!");
    } else {
      console.log(`The dealer has stayed - Current Dealer Hand Total: ${this.dealer.getHandValue()}`);
    }

    this.continuePrompt();
  }

  dealerAutoHit() {
    while (this.dealer.checkUnder17()) {
      this.deck.hit(this.dealer);
      this.displayTable();
      console.log(`The dealer hits for a new total of ${this.dealer.getHandValue()}`);
    }
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(`Welcome to ${TwentyOneGame.TOP_SCORE}!`);
    console.log("It's you against the dealer.");
    console.log(`Get as close to ${TwentyOneGame.TOP_SCORE} as possible without going over.`);
    console.log(`You begin with $${TwentyOneGame.STARTING_MONEY}.`);
    console.log("Run out of money and you're out of here.");
    console.log(`Work your way up to $${TwentyOneGame.MAX_MONEY} and you're rich!`);
    console.log("Good luck out there..");
    this.continuePrompt();
  }

  displayGoodbyeMessage() {
    console.log("Thank's for playing Twenty One!");
  }

  displayResults() {
    this.displayTable();
    if (this.player.isBusted()) {
      this.player.loseDollar();
      this.displayTable();
      console.log('Well, you busted.. Hand over that dollar!');
      console.log(`You now have $${this.player.moneyInWallet()}, there's always next round..`);
    } else if (this.dealer.isBusted()) {
      this.player.winDollar();
      this.displayTable();
      console.log('The dealer busted! You get a dollar.');
      console.log(`Easiest dollar you've ever made.. You now have $${this.player.moneyInWallet()}.`);
    } else if (this.compareHands() === 'player') {
      this.player.winDollar();
      this.displayTable();
      console.log(`You win this round and gain a dollar!`);
      console.log(`Congrats high-roller, you now have $${this.player.moneyInWallet()}.`);
    } else if (this.compareHands() === 'dealer') {
      this.player.loseDollar();
      this.displayTable();
      console.log('The house always wins.. Or at least it did this time.');
      console.log(`The dealer thanks you for the dollar, you now have $${this.player.moneyInWallet()}.`);
    } else if (this.compareHands() === 'tie') {
      console.log('A tie?? What are the chances of that..');
      console.log("Looks like there's no money changing hands this round.");
    }

    this.continuePrompt();
  }

  compareHands() {
    let playerHand = this.player.getHandValue();
    let dealerHand = this.dealer.getHandValue();

    if (playerHand > dealerHand) {
      return 'player';
    } else if (dealerHand > playerHand) {
      return 'dealer';
    } else {
      return 'tie';
    }
  }

  checkMoney() {
    let currentMoney = this.player.moneyInWallet();
    if (currentMoney === TwentyOneGame.MIN_MONEY || currentMoney === TwentyOneGame.MAX_MONEY) {
      return true;
    } else {
      return null;
    }
  }

  displayBrokeOrRich() {
    console.clear();
    this.displayTable();
    let currentMoney = this.player.moneyInWallet();

    if (currentMoney === TwentyOneGame.MIN_MONEY) {
      console.log('Well this is awkward.. But you appear to be broke.');
      console.log("We're gonna have to ask you to leave and come back when you've got more cash.");
    } else if (currentMoney === TwentyOneGame.MAX_MONEY) {
      console.log("Would you look at that, you're rich!");
      console.log("Don't go spending it all in one place..")
    }

    this.continuePrompt();
  }

  continuePrompt() {
    console.log('');
    console.log('Press <Enter> to continue.');
    readline.question();
  }

  playAgainPrompt() {
    let answer;

    while (true) {
      console.log("Wanna keep going? (Y/N)")
      answer = readline.question().toLowerCase()[0];
      if (['y', 'n'].includes(answer)) break;
    }

    return answer;
  }
}

let game = new TwentyOneGame();
game.play();


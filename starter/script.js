'use strict';

const game = {
  playerTurn: rand0or1(),
  player0: {
    current: 0,
    total: 0,
  },
  player1: {
    current: 0,
    total: 0,
  },
};

const rollDiceBtn = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

// player 1
const player0CurrentScore = document.getElementById('current--0');
const player0TotalScore = document.getElementById('score--0');

// player 2
const player1CurrentScore = document.getElementById('current--1');
const player1TotalScore = document.getElementById('score--1');

// give white bg to first player
document
  .querySelector(`.player--${game.playerTurn}`)
  .classList.add('player--active');

// ROLL DICE EVENT
rollDiceBtn.addEventListener('click', function () {
  if (game[`player${game.playerTurn}`].total >= 100) {
    return;
  }

  const diceResult = randNumFrom1To(6);
  // dice img
  dice.src = `dice-${diceResult}.png`;
  dice.classList.remove('hidden');

  // check if diceResult is 1
  if (diceResult === 1) {
    // reset current
    game[`player${game.playerTurn}`].current = 0;
    document.getElementById(`current--${game.playerTurn}`).textContent = 0;
    changeTurn();

    // if result is not 1
  } else {
    // update current
    game[`player${game.playerTurn}`].current += diceResult;
    document.getElementById(`current--${game.playerTurn}`).textContent =
      game[`player${game.playerTurn}`].current;
  }
});

// HOLD EVENT
holdBtn.addEventListener('click', function () {
  // update total
  game[`player${game.playerTurn}`].total +=
    game[`player${game.playerTurn}`].current;
  document.getElementById(`score--${game.playerTurn}`).textContent =
    game[`player${game.playerTurn}`].total;
  // reset current
  game[`player${game.playerTurn}`].current = 0;
  document.getElementById(`current--${game.playerTurn}`).textContent = 0;

  // win check
  if (game[`player${game.playerTurn}`].total >= 100) {
    document
      .querySelector(`.player--${game.playerTurn}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${game.playerTurn}`)
      .classList.remove('player--active');
    // hide the dice
    dice.classList.add('hidden');
  } else {
    changeTurn();
  }
});

// NEW GAME EVENT
newGameBtn.addEventListener('click', function () {
  // remove winner and active classes
  document
    .querySelector(`.player--${game.playerTurn}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${game.playerTurn}`)
    .classList.remove('player--active');

  // reset game stats
  game.playerTurn = rand0or1();
  game.player0.current = 0;
  game.player0.total = 0;
  game.player1.current = 0;
  game.player1.total = 0;

  // reset game stats interface
  document
    .querySelector(`.player--${game.playerTurn}`)
    .classList.add('player--active');
  dice.classList.add('hidden');
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
});

//! FUNCTION
// change turn and active player
function changeTurn() {
  game.playerTurn = Number(!game.playerTurn);
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

// random number between 1 to max
function randNumFrom1To(max) {
  return Math.trunc(Math.random() * max) + 1;
}

// random between 0 and 1
function rand0or1() {
  return Math.round(Math.random());
}

import Gameboard from "./Gameboard";

const Computer = function ComputerFactory(name = "Computer") {
  const gameboard = Gameboard();
  let opponent;

  const setOpponent = function defineThePlayersOpponent(player) {
    opponent = player;
  };

  const getRandomBetween = function getRandomNumberBetweenMinAndMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const playMove = function makeARandomMoveInsideOpponentGameboard() {
    if (opponent.gameboard.coordinatesHit.length >= 100) {
      return;
    }

    const targetToAttackIndexFirst = 0;
    const targetToAttackIndexLast =
      opponent.gameboard.coordinatesNotYetHit.length - 1;
    const targetToAttackIndex = getRandomBetween(
      targetToAttackIndexFirst,
      targetToAttackIndexLast
    );

    const targetCoordinates =
      opponent.gameboard.coordinatesNotYetHit[targetToAttackIndex];

    opponent.gameboard.receiveAttack(targetCoordinates);
  };

  return {
    get name() {
      return name;
    },
    get gameboard() {
      return gameboard;
    },
    get opponent() {
      return opponent;
    },
    setOpponent,
    playMove,
  };
};

export default Computer;

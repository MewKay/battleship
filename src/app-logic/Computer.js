import Gameboard from "./Gameboard";

const Computer = function ComputerFactory() {
  const gameboard = Gameboard();
  let opponent;

  const setOpponent = function defineThePlayersOpponent(player) {
    opponent = player;
  };

  const getRandomBetween = function getRandomNumberBetweenMinAndMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const playMove = function makeARandomMoveInsideOpponentGameboard() {
    const targetX = getRandomBetween(1, 10);
    const targetY = getRandomBetween(1, 10);

    const targetCoordinates = `${targetX},${targetY}`;

    opponent.gameboard.receiveAttack(targetCoordinates);
  };

  return {
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

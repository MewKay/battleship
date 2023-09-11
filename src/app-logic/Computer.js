import Gameboard from "./Gameboard";

const Computer = function ComputerFactory() {
  const gameboard = Gameboard();
  let opponent;

  const setOpponent = function defineThePlayersOpponent(player) {
    opponent = player;
  };

  return {
    get gameboard() {
      return gameboard;
    },
    get opponent() {
      return opponent;
    },
    setOpponent,
  };
};

export default Computer;

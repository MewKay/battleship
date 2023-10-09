import Gameboard from "./Gameboard";

const Player = function PlayerFactory(name) {
  const gameboard = Gameboard();
  let opponent;
  let isTurn = false;

  const setOpponent = function defineThePlayersOpponent(player) {
    opponent = player;
  };

  const playMove = function makeTheOpponentsGameboardToReceiveAttack(
    coordinates
  ) {
    if (!opponent) {
      return;
    }

    opponent.gameboard.receiveAttack(coordinates);
  };

  const switchTurn = () => {
    isTurn = !isTurn;
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
    get isTurn() {
      return isTurn;
    },
    switchTurn,
    setOpponent,
    playMove,
  };
};

export default Player;

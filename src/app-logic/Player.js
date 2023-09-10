import Gameboard from "./Gameboard";

const Player = function PlayerFactory(name) {
  const gameboard = Gameboard();
  let opponent;

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

export default Player;

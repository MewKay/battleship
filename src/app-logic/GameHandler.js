import Player from "./Player";
import Computer from "./Computer";

const GameHandler = (() => {
  let player1 = undefined;
  let player2 = undefined;

  const newGame = function createANewGameWithASetOfPlayers() {
    player1 = Player("Player 1");
    player2 = Computer();
  };

  return {
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
    newGame,
  };
})();

export default GameHandler;

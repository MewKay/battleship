import Player from "./Player";
import Computer from "./Computer";
import ShipClasses from "./ShipClasses";

const GameHandler = (() => {
  let player1 = undefined;
  let player2 = undefined;

  const newGame = function createANewGameWithASetOfPlayers() {
    player1 = Player("Player 1");
    player2 = Computer();

    player1.gameboard.placeShip(ShipClasses.BATTLESHIP, "1,1", false);
    player1.gameboard.placeShip(ShipClasses.CARRIER, "10,1", true);
    player1.gameboard.placeShip(ShipClasses.CRUISER, "4,5", true);
    player1.gameboard.placeShip(ShipClasses.DESTROYER, "8,10", false);
    player1.gameboard.placeShip(ShipClasses.SUBMARINE, "6,7", false);

    player2.gameboard.placeShip(ShipClasses.BATTLESHIP, "6,5", true);
    player2.gameboard.placeShip(ShipClasses.CARRIER, "10,5", true);
    player2.gameboard.placeShip(ShipClasses.CRUISER, "1,1", false);
    player2.gameboard.placeShip(ShipClasses.DESTROYER, "5,5", true);
    player2.gameboard.placeShip(ShipClasses.SUBMARINE, "8,4", false);
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

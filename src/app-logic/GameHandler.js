import Player from "./Player";
import Computer from "./Computer";
import ShipClasses from "./ShipClasses";

const GameHandler = (() => {
  let player1;
  let player2;
  let currentPlayer;
  let isComputerGame = true;

  const newGame = function createANewGameWithASetOfPlayers() {
    player1 = Player("Player 1");
    player2 = Computer("Player 2");

    player1.setOpponent(player2);
    player2.setOpponent(player1);

    currentPlayer = player1;
    player1.switchTurn();

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

  const playTurn = function makeTheCurrentPlayerPlayMove(coordinate) {
    if (checkGameEnd() === true) {
      return;
    }

    currentPlayer.playMove(coordinate);

    if (checkGameEnd() === true) {
      return;
    }

    switchTurn();

    if (isComputerGame === true) {
      currentPlayer.playMove();

      if (checkGameEnd() === true) {
        return;
      }

      switchTurn();
    }
  };

  const switchTurn = function changeCurrentPlayerToTheOther() {
    if (player1.isTurn === true) {
      currentPlayer = player2;
      player1.switchTurn();
      player2.switchTurn();
    } else {
      currentPlayer = player1;
      player1.switchTurn();
      player2.switchTurn();
    }
  };

  const checkGameEnd = function checkIfOneOfGameboardHaveAllShipSunk() {
    return (
      player1.gameboard.allShipsSunk() === true ||
      player2.gameboard.allShipsSunk() === true
    );
  };

  const getWinner = function getGameWinnerIfItEnds() {
    if (!checkGameEnd()) {
      return undefined;
    }

    return player1.gameboard.allShipsSunk() ? player2 : player1;
  };

  newGame();

  return {
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
    get currentPlayer() {
      return currentPlayer;
    },
    get isComputerGame() {
      return isComputerGame;
    },
    newGame,
    playTurn,
    checkGameEnd,
    getWinner,
  };
})();

export default GameHandler;

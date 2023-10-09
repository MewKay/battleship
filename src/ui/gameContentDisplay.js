import GameHandler from "../app-logic/GameHandler";
import gameboardDisplay from "./gameboardDisplay";
import gameMessage from "./gameMessage";
import restartButton from "./restartGame";

const gameContent = function displayGameContent() {
  const container = document.createElement("div");
  container.classList.add("game-content");

  const gameRestartButton = restartButton();

  let player1Display;
  let player2Display;

  const render = function renderGameInterface() {
    container.innerText = "";

    const gameboardContainer = document.createElement("div");
    gameboardContainer.classList.add("gameboard-container");

    player1Display = gameboardDisplay(GameHandler.player1, true);
    player2Display = gameboardDisplay(GameHandler.player2, false);

    gameboardContainer.appendChild(player1Display.container);
    gameboardContainer.appendChild(player2Display.container);

    container.appendChild(gameMessage.container);
    container.appendChild(gameboardContainer);
    container.appendChild(gameRestartButton);

    gameMessage.update();
  };

  container.addEventListener("click", (event) => {
    const parentClassName = event.target.parentNode.className;
    const cellCoordinate = event.target.classList[0];

    if (
      (parentClassName !== "player-1-gameboard" &&
        parentClassName !== "player-2-gameboard") ||
      event.target.classList[1] === "hit"
    ) {
      return;
    }

    GameHandler.playTurn(cellCoordinate);
    player1Display.renderGameboard();
    player2Display.renderGameboard();

    gameMessage.update();

    if (GameHandler.checkGameEnd() === true) {
      gameRestartButton.style.display = "block";
    }
  });

  gameRestartButton.addEventListener("click", () => {
    gameRestartButton.style.display = "none";
    GameHandler.newGame();
    render();
  });

  render();

  return container;
};

export default gameContent;

import GameHandler from "../app-logic/GameHandler";
import gameboardDisplay from "./gameboardDisplay";
import gameMessage from "./gameMessage";

const gameContent = function displayGameContent() {
  const container = document.createElement("div");
  container.classList.add("game-content");

  const gameboardContainer = document.createElement("div");
  gameboardContainer.classList.add("gameboard-container");

  const player1Display = gameboardDisplay(GameHandler.player1, true);
  const player2Display = gameboardDisplay(GameHandler.player2, false);
  gameboardContainer.appendChild(player1Display.container);
  gameboardContainer.appendChild(player2Display.container);

  container.appendChild(gameMessage.container);
  container.appendChild(gameboardContainer);

  gameMessage.update();
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
  });

  return container;
};

export default gameContent;

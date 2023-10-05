import GameHandler from "../app-logic/GameHandler";
import gameboardDisplay from "./gameboardDisplay";

const gameContent = function displayGameContent() {
  const container = document.createElement("div");
  container.classList.add("game-content");

  const player1Display = gameboardDisplay(GameHandler.player1, true);
  const player2Display = gameboardDisplay(GameHandler.player2, false);

  container.appendChild(player1Display.container);
  container.appendChild(player2Display.container);

  return container;
};

export default gameContent;

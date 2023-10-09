import GameHandler from "../app-logic/GameHandler";

const gameMessage = (function displayGameMessages() {
  const container = document.createElement("div");
  container.classList.add("game-message-container");

  const messageDisplay = document.createElement("p");
  container.appendChild(messageDisplay);

  let message;

  const update = function updateMessageToCurrentGameEvent() {
    if (GameHandler.checkGameEnd() === true) {
      message = `${GameHandler.getWinner().name} won the game!`;
    } else {
      message = `It's ${GameHandler.currentPlayer.name}'s turn now.`;
    }

    messageDisplay.textContent = message;
  };

  return {
    container,
    update,
    get message() {
      return message;
    },
  };
})();

export default gameMessage;

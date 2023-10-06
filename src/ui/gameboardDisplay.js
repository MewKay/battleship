const createPlayerNameContainer = (Player, playerNumberClass) => {
  const container = document.createElement("div");
  container.classList.add(`${playerNumberClass}-title-container`);

  const title = document.createElement("h3");
  title.classList.add(`${playerNumberClass}-title`);
  title.textContent = Player.name;

  container.appendChild(title);

  return container;
};

const createPlayerGameboardContainer = (Player, playerNumberClass) => {
  const container = document.createElement("div");
  const coordinates = Player.gameboard.coordinates;
  const coordinatesKeys = Object.keys(coordinates);

  container.classList.add(`${playerNumberClass}-gameboard`);
  coordinatesKeys.forEach((key) => {
    const gameboardCell = document.createElement("div");
    gameboardCell.classList.add(key);

    if (coordinates[key].hit === true) {
      gameboardCell.innerText = "X";
    }

    if (coordinates[key].isShipPlaced === true) {
      gameboardCell.classList.add("ship-placed");
    }

    container.appendChild(gameboardCell);
  });

  return container;
};

const gameboardDisplay = function displayPlayersGameboard(Player, isPlayerOne) {
  const container = document.createElement("div");
  const playerNumberClass = isPlayerOne ? "player-1" : "player-2";
  container.classList.add(`${playerNumberClass}-container`);

  let playerNameContainer = createPlayerNameContainer(
    Player,
    playerNumberClass
  );
  let gameboardContainer = createPlayerGameboardContainer(
    Player,
    playerNumberClass
  );

  const render = function renderGameboardInnerElements() {
    container.innerText = "";
    container.appendChild(playerNameContainer);
    container.appendChild(gameboardContainer);
  };

  render();

  return {
    get container() {
      return container;
    },
    get gameboardContainer() {
      return gameboardContainer;
    },
    render,
  };
};

export default gameboardDisplay;

const createPlayerNameContainer = (Player) => {
  const container = document.createElement("div");
  container.classList.add(`${Player.name}-title-container`);

  const title = document.createElement("h3");
  title.classList.add(`${Player.name}-title`);
  title.textContent = Player.name;

  container.appendChild(title);

  return container;
};

const createPlayerGameboardContainer = (Player) => {
  const container = document.createElement("div");
  container.classList.add(`${Player.name}-gameboard`);

  const coordinatesKeys = Object.keys(Player.gameboard.coordinates);
  coordinatesKeys.forEach((key) => {
    const gameboardCell = document.createElement("div");
    gameboardCell.classList.add(key);
    container.appendChild(gameboardCell);
  });

  return container;
};

const gameboardDisplay = function displayPlayersGameboard(Player) {
  const container = document.createElement("div");
  container.classList.add(`${Player.name}-container`);
  const playerNameContainer = createPlayerNameContainer(Player);
  const gameboardContainer = createPlayerGameboardContainer(Player);

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
    render,
  };
};

export default gameboardDisplay;

const gameTitle = function createElementContainingTheTitle() {
  const container = document.createElement("div");
  container.classList.add("game-title-container");

  const title = document.createElement("h1");
  title.classList.add("game-title");
  title.innerText = "Battleship";
  container.appendChild(title);

  return container;
};

export default gameTitle;

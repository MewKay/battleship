const Gameboard = function GameboardFactory() {
  const coordinates = (() => {
    const list = {};

    for (let i = 1; i <= 10; i += 1) {
      for (let j = 1; j <= 10; j += 1) {
        list[`${i},${j}`] = {
          shipPlacedName: null,
          isShipPlaced: false,
          hit: false,
        };
      }
    }

    return list;
  })();

  return {
    get coordinates() {
      return coordinates;
    },
  };
};

export default Gameboard;

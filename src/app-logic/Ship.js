const Ship = function ShipFactory(name, length) {
  let hits = 0;

  const hit = function addOneToHits() {
    hits++;
  };

  const isSunk = function checkIfShipIsSunk() {
    return hits === length;
  };

  return {
    get name() {
      return name;
    },
    get length() {
      return length;
    },
    get hits() {
      return hits;
    },
    hit,
    isSunk,
  };
};

export default Ship;

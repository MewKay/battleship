const Ship = function ShipFactory() {
  let length;
  let hits = 0;

  const hit = function addOneToHits() {
    hits++;
  };

  const isSunk = function checkIfShipIsSunk() {
    return hits === length;
  };

  return {
    get length() {
      return length;
    },
    set length(value) {
      length = value;
    },
    get hits() {
      return hits;
    },
    hit,
    isSunk,
  };
};

export default Ship;

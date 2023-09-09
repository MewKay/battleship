import Ship from "./Ship";

const ShipClasses = Object.freeze({
  get CARRIER() {
    return Ship("Carrier", 5);
  },
  get BATTLESHIP() {
    return Ship("Battleship", 4);
  },
  get CRUISER() {
    return Ship("Cruiser", 3);
  },
  get SUBMARINE() {
    return Ship("Submarine", 3);
  },
  get DESTROYER() {
    return Ship("Destroyer", 2);
  },
});

export default ShipClasses;

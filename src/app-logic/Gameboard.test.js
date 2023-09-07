import Gameboard from "./Gameboard";

describe("GameBoard object", () => {
  const myGameboard = Gameboard();

  describe("Coordinates property", () => {
    let listOfCoordinates = myGameboard.coordinates;
    let arrayOfCoordinatesKeys = Object.keys(listOfCoordinates);

    it("should be defined", () => {
      expect(listOfCoordinates).toBeDefined();
    });

    it("should contain hundred coordinates", () => {
      expect(arrayOfCoordinatesKeys.length).toBe(100);
    });

    it("should contain valid coordinates", () => {
      for (let i = 1; i <= 10; i += 1) {
        for (let j = 1; j <= 10; j += 1) {
          expect(listOfCoordinates[`${i},${j}`]).toBeTruthy();
        }
      }
    });

    it("should have all of its properties to be set to false or null", () => {
      arrayOfCoordinatesKeys.forEach((key) => {
        expect(listOfCoordinates[key].shipPlacedName).toBeNull();
        expect(listOfCoordinates[key].isShipPlaced).toBe(false);
        expect(listOfCoordinates[key].hit).toBe(false);
      });
    });
  });
});

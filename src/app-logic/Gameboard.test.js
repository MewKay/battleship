import Gameboard from "./Gameboard";
import Ship from "./Ship";

describe("GameBoard object", () => {
  const myGameboard = Gameboard();

  describe("Coordinates property", () => {
    let listOfCoordinates = { ...myGameboard.coordinates };
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

  describe("placeShip function", () => {
    const shipToPlace = Ship("Destroyer", 2);
    const shipHeadCoordinates = "1,5";
    const isShipHorizontal = true;
    myGameboard.placeShip(shipToPlace, shipHeadCoordinates, isShipHorizontal);

    it("should change the coordinates to receive the ship's head name and set isShipPlaced to true", () => {
      expect(myGameboard.coordinates[shipHeadCoordinates].shipPlacedName).toBe(
        shipToPlace.name
      );
      expect(myGameboard.coordinates[shipHeadCoordinates].isShipPlaced).toBe(
        true
      );
    });

    describe("should change the coordinates following ship's length when", () => {
      it("is set to be horizontal", () => {
        for (let i = 1; i < 1 + shipToPlace.length; i += 1) {
          expect(myGameboard.coordinates[`${i},5`].shipPlacedName).toBe(
            shipToPlace.name
          );
          expect(myGameboard.coordinates[`${i},5`].isShipPlaced).toBe(true);
        }
      });

      it("is set to be vertical", () => {
        myGameboard.placeShip(Ship("Cruiser", 3), "6,1", false);

        for (let j = 1; j < 1 + shipToPlace.length; j += 1) {
          expect(myGameboard.coordinates[`6,${j}`].shipPlacedName).toBe(
            "Cruiser"
          );
          expect(myGameboard.coordinates[`6,${j}`].isShipPlaced).toBe(true);
        }
      });
    });

    it("should only receive valid coordinates", () => {
      myGameboard.placeShip(shipToPlace, "15,2", isShipHorizontal);
      myGameboard.placeShip(shipToPlace, "0,8", isShipHorizontal);

      expect(myGameboard.coordinates["15,2"]).toBeUndefined();
      expect(myGameboard.coordinates["0,8"]).toBeUndefined();
    });
  });
});

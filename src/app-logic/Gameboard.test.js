import Gameboard from "./Gameboard";
import Ship from "./Ship";
import ShipClasses from "./ShipClasses";

describe("GameBoard object", () => {
  describe("Coordinates property", () => {
    const myGameboard1 = Gameboard();
    let listOfCoordinates = { ...myGameboard1.coordinates };
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
    const myGameboard2 = Gameboard();
    const shipToPlace = ShipClasses.DESTROYER;
    const shipHeadCoordinates = "1,5";
    const isShipHorizontal = true;
    myGameboard2.placeShip(shipToPlace, shipHeadCoordinates, isShipHorizontal);

    it("should change the coordinates to receive the ship's head name and set isShipPlaced to true", () => {
      expect(myGameboard2.coordinates[shipHeadCoordinates].shipPlacedName).toBe(
        shipToPlace.name
      );
      expect(myGameboard2.coordinates[shipHeadCoordinates].isShipPlaced).toBe(
        true
      );
    });

    describe("should change the coordinates following ship's length when", () => {
      it("is set to be horizontal", () => {
        for (let j = 5; j < 5 + shipToPlace.length; j += 1) {
          expect(myGameboard2.coordinates[`1,${j}`].shipPlacedName).toBe(
            shipToPlace.name
          );
          expect(myGameboard2.coordinates[`1,${j}`].isShipPlaced).toBe(true);
        }
      });

      it("is set to be vertical", () => {
        myGameboard2.placeShip(ShipClasses.CRUISER, "6,1", false);

        for (let i = 6; i < 6 + shipToPlace.length; i += 1) {
          expect(myGameboard2.coordinates[`${i},1`].shipPlacedName).toBe(
            "Cruiser"
          );
          expect(myGameboard2.coordinates[`${i},1`].isShipPlaced).toBe(true);
        }
      });
    });

    it("should only receive valid coordinates", () => {
      myGameboard2.placeShip(shipToPlace, "15,2", isShipHorizontal);
      myGameboard2.placeShip(shipToPlace, "0,8", isShipHorizontal);

      expect(myGameboard2.coordinates["15,2"]).toBeUndefined();
      expect(myGameboard2.coordinates["0,8"]).toBeUndefined();
    });

    describe("should not accept ship if it exceeds the grid", () => {
      it("should not exceeds horizontally", () => {
        const shipToPlace = ShipClasses.CARRIER;
        const overflowingCoordinate = "1,10";
        const initialCoordinateState = {
          ...myGameboard2.coordinates[overflowingCoordinate],
        };

        myGameboard2.placeShip(shipToPlace, overflowingCoordinate, true);

        expect(myGameboard2.coordinates[overflowingCoordinate]).toEqual(
          initialCoordinateState
        );

        for (let j = 11; j < shipToPlace.length + 11; j += 1) {
          expect(myGameboard2.coordinates[`1,${j}`]).toBeUndefined();
        }
      });

      it("should not exceeds vertically", () => {
        const shipToPlace = ShipClasses.CARRIER;
        const overflowingCoordinate = "10,1";
        const initialCoordinateState = {
          ...myGameboard2.coordinates[overflowingCoordinate],
        };

        myGameboard2.placeShip(shipToPlace, overflowingCoordinate, false);

        expect(myGameboard2.coordinates[overflowingCoordinate]).toEqual(
          initialCoordinateState
        );

        for (let i = 11; i < shipToPlace.length + 11; i += 1) {
          expect(myGameboard2.coordinates[`${i},1`]).toBeUndefined();
        }
      });
    });

    describe("should not accept ship if another ship is already placed on the same coordinates", () => {
      it("should not accept if same head coordinates", () => {
        myGameboard2.placeShip(ShipClasses.CARRIER, shipHeadCoordinates, false);

        expect(
          myGameboard2.coordinates[shipHeadCoordinates].shipPlacedName
        ).toBe(shipToPlace.name);
      });

      it("should not accept if ship tail conflict with another existing ship", () => {
        myGameboard2.placeShip(Ship("Carrier", 5), "1,4", true);

        for (let j = 4; j < 4 + 5; j += 1) {
          expect(myGameboard2.coordinates[`1,${j}`].shipPlacedName).not.toBe(
            "Carrier"
          );
        }
      });
    });
  });

  describe("receiveAttack function", () => {
    const myGameboard3 = Gameboard();
    const targetCoordinates = "1,6";
    myGameboard3.receiveAttack(targetCoordinates);

    it("should update the right coordinates", () => {
      expect(myGameboard3.coordinates[targetCoordinates].hit).toBe(true);
    });
  });

  describe("allShipsSunk function", () => {
    const myGameboard4 = Gameboard();
    const myGameboard5 = Gameboard();

    myGameboard4.placeShip(ShipClasses.DESTROYER, "1,5", true);
    myGameboard4.placeShip(ShipClasses.SUBMARINE, "4,2", false);
    myGameboard4.placeShip(ShipClasses.BATTLESHIP, "2,2", true);

    myGameboard5.placeShip(ShipClasses.DESTROYER, "1,5", true);
    myGameboard5.placeShip(ShipClasses.SUBMARINE, "4,2", false);
    myGameboard5.placeShip(ShipClasses.BATTLESHIP, "2,2", true);

    it("should be true if all ships placed are sunk", () => {
      myGameboard4.receiveAttack("1,5");
      myGameboard4.receiveAttack("1,6");

      myGameboard4.receiveAttack("4,2");
      myGameboard4.receiveAttack("5,2");
      myGameboard4.receiveAttack("6,2");

      myGameboard4.receiveAttack("2,2");
      myGameboard4.receiveAttack("2,3");
      myGameboard4.receiveAttack("2,4");
      myGameboard4.receiveAttack("2,5");

      expect(myGameboard4.allShipsSunk()).toBe(true);
    });

    it("should be false if at least one ship isn't sunk", () => {
      myGameboard5.receiveAttack("1,5");
      myGameboard5.receiveAttack("1,6");

      myGameboard5.receiveAttack("4,2");
      myGameboard5.receiveAttack("6,2");

      myGameboard5.receiveAttack("2,2");
      myGameboard5.receiveAttack("2,3");
      myGameboard5.receiveAttack("2,4");
      myGameboard5.receiveAttack("2,5");

      expect(myGameboard5.allShipsSunk()).toBe(false);
    });
  });

  describe("isAttackValid function", () => {
    const myGameboard6 = Gameboard();

    it("should return false if coordinates exceeds the grid", () => {
      expect(myGameboard6.isAttackValid("2,15")).toBe(false);
      expect(myGameboard6.isAttackValid("15,2")).toBe(false);
      expect(myGameboard6.isAttackValid("11,5")).toBe(false);
      expect(myGameboard6.isAttackValid("0,4")).toBe(false);
    });

    it("should return false if coordinates was already been hit", () => {
      const initialCoordinates = "5,7";
      myGameboard6.receiveAttack(initialCoordinates);
      expect(myGameboard6.isAttackValid(initialCoordinates)).toBe(false);
    });

    it("should return true for coordinates within range and not already hits", () => {
      expect(myGameboard6.isAttackValid("5,6")).toBe(true);
      expect(myGameboard6.isAttackValid("7,2")).toBe(true);
      expect(myGameboard6.isAttackValid("10,1")).toBe(true);
      expect(myGameboard6.isAttackValid("1,10")).toBe(true);
    });
  });
});

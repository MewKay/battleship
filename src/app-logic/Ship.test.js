import Ship from "./Ship";

describe("Ship", () => {
  describe("Ship object should have following propreties", () => {
    const myShip = Ship();
    it("should have length", () => {
      expect(myShip).toHaveProperty("length");
    });

    it("should have number of times it's been hit", () => {
      expect(myShip).toHaveProperty("hits");
    });
  });

  describe("Ship object should have following functions", () => {
    describe("hit function", () => {
      it("should increase number of hits by one", () => {
        const myShip = Ship();
        myShip.hit();
        expect(myShip.hits).toBe(1);
      });
    });

    describe("isSunk function", () => {
      it("should be true if length is equal to hits", () => {
        const myShip = Ship();
        myShip.length = 3;

        myShip.hit();
        myShip.hit();
        myShip.hit();

        expect(myShip.isSunk()).toBe(myShip.hits === myShip.length);
      });
    });
  });
});

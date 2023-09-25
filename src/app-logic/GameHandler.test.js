import GameHandler from "./GameHandler";
import Player from "./Player";
import Computer from "./Computer";

describe("GameHandler object", () => {
  it("should have a player1 property", () => {
    expect(GameHandler).toHaveProperty("player1");
  });

  it("should have a player2 property", () => {
    expect(GameHandler).toHaveProperty("player2");
  });

  describe("newGame function", () => {
    GameHandler.newGame();

    it("should define player1 as Player", () => {
      const result = JSON.stringify(GameHandler.player1);
      const expected = JSON.stringify(Player("Player 1"));

      expect(result).toBe(expected);
    });

    it("should define player2 as Computer", () => {
      const result = JSON.stringify(GameHandler.player2);
      const expected = JSON.stringify(Computer());

      expect(result).toBe(expected);
    });
  });
});

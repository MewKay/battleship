import Computer from "./Computer";
import Player from "./Player";

describe("Computer object", () => {
  it("should have its own gameboard", () => {
    const computer = Computer();

    expect(computer.gameboard).toBeDefined();
  });

  it("should be able to set Computer's opponent to a Player", () => {
    const player = Player("One");
    const computer = Computer();

    player.setOpponent(computer);
    computer.setOpponent(player);

    expect(player.opponent).toEqual(computer);
    expect(computer.opponent).toEqual(player);
  });
});

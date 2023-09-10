import Player from "./Player";

describe("Player object", () => {
  it("should have its own gameboard", () => {
    const player = Player();

    expect(player.gameboard).toBeDefined();
  });

  it("should be able to set Player's opponent", () => {
    const playerOne = Player("One");
    const playerTwo = Player("Two");

    playerOne.setOpponent(playerTwo);
    playerTwo.setOpponent(playerOne);

    expect(playerOne.opponent).toEqual(playerTwo);
    expect(playerTwo.opponent).toEqual(playerOne);
  });

  it("should have a playMove() function that calls opponent's gameboard receiveAttack()", () => {
    const evilPlayer = Player("Villain");
    const goodPlayer = Player("Hero");

    goodPlayer.setOpponent(evilPlayer);
    evilPlayer.setOpponent(goodPlayer);

    const targetCoordinates = "1,8";
    goodPlayer.playMove(targetCoordinates);

    expect(evilPlayer.gameboard.coordinates[targetCoordinates].hit).toBe(true);
  });
});

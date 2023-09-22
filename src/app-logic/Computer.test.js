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

  describe("playMove function", () => {
    describe("should update the opponent's coordinatesHit and coordinatesNotYetHit properties when", () => {
      it("is called any time (as after 65 moves)", () => {
        const player = Player("John Human");
        const computer = Computer();

        player.setOpponent(computer);
        computer.setOpponent(player);

        const initialOpponentCoordinatesHit = [
          ...computer.opponent.gameboard.coordinatesHit,
        ];
        const initialOpponentCoordinatesNotYetHit = [
          ...computer.opponent.gameboard.coordinatesNotYetHit,
        ];
        const NUMBER_OF_MOVES = 65;

        for (let i = 0; i < NUMBER_OF_MOVES; i += 1) {
          computer.playMove();
        }

        expect(player.gameboard.coordinatesHit.length).toBe(
          initialOpponentCoordinatesHit.length + NUMBER_OF_MOVES
        );
        expect(player.gameboard.coordinatesNotYetHit.length).toBe(
          initialOpponentCoordinatesNotYetHit.length - NUMBER_OF_MOVES
        );
      });
    });
  });
});

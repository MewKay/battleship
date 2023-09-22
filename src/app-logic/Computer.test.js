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

      it("is called when every coordinates are hit, should not update", () => {
        const player2 = Player("John Human 2");
        const computer2 = Computer();

        player2.setOpponent(computer2);
        computer2.setOpponent(player2);

        for (let i = 0; i < 100; i += 1) {
          const currentCoordinate = player2.gameboard.coordinatesNotYetHit[0];
          player2.gameboard.receiveAttack(currentCoordinate);
        }

        const initialOpponentCoordinatesHit = [
          ...computer2.opponent.gameboard.coordinatesHit,
        ];
        const initialOpponentCoordinatesNotYetHit = [
          ...computer2.opponent.gameboard.coordinatesNotYetHit,
        ];

        computer2.playMove();

        expect(player2.gameboard.coordinatesHit.length).toBe(
          initialOpponentCoordinatesHit.length
        );
        expect(player2.gameboard.coordinatesNotYetHit.length).toBe(
          initialOpponentCoordinatesNotYetHit.length
        );
      });
    });
  });
});

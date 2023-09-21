const Gameboard = function GameboardFactory() {
  const coordinates = (() => {
    const list = {};

    for (let i = 1; i <= 10; i += 1) {
      for (let j = 1; j <= 10; j += 1) {
        list[`${i},${j}`] = {
          shipPlacedName: null,
          isShipPlaced: false,
          hit: false,
        };
      }
    }

    return list;
  })();

  const ShipStored = {};

  let coordinatesNotYetHit = [...Object.keys(coordinates)];
  let coordinatesHit = [];

  const convertCoordinates = function extractXandYCoordinates(coordinates) {
    const arrayCoordinates = coordinates.split(",").map(Number);
    return {
      row: arrayCoordinates[0],
      column: arrayCoordinates[1],
    };
  };

  const isWithinRange = function checkIfNumberIsWithinGameboardDimension(
    number
  ) {
    return number >= 1 && number <= 10;
  };

  const isShipPlacementValid =
    function checkIfShipPlacedWithSpecifiedHeadCoordinatesIsValid(
      shipToPlace,
      shipHeadCoordinates,
      isShipHorizontal
    ) {
      const shipStartingCoordinates = convertCoordinates(shipHeadCoordinates);

      if (
        !isWithinRange(shipStartingCoordinates.row) ||
        !isWithinRange(shipStartingCoordinates.column)
      ) {
        return false;
      }

      if (isShipHorizontal) {
        if (
          !isWithinRange(
            shipStartingCoordinates.column + shipToPlace.length - 1
          )
        ) {
          return false;
        }

        for (
          let j = shipStartingCoordinates.column;
          j < shipStartingCoordinates.column + shipToPlace.length;
          j += 1
        ) {
          if (coordinates[`${shipStartingCoordinates.row},${j}`].isShipPlaced) {
            return false;
          }
        }
      } else {
        if (
          !isWithinRange(shipStartingCoordinates.row + shipToPlace.length - 1)
        ) {
          return false;
        }

        for (
          let i = shipStartingCoordinates.row;
          i < shipStartingCoordinates.row + shipToPlace.length;
          i += 1
        ) {
          if (
            coordinates[`${i},${shipStartingCoordinates.column}`].isShipPlaced
          ) {
            return false;
          }
        }
      }

      return true;
    };

  const placeShip = function putShipToCoordinates(
    shipToPlace,
    shipHeadCoordinates,
    isShipHorizontal
  ) {
    const shipStartingCoordinates = convertCoordinates(shipHeadCoordinates);

    if (
      !isShipPlacementValid(shipToPlace, shipHeadCoordinates, isShipHorizontal)
    ) {
      return;
    }

    if (isShipHorizontal) {
      for (
        let j = shipStartingCoordinates.column;
        j < shipStartingCoordinates.column + shipToPlace.length;
        j += 1
      ) {
        coordinates[`${shipStartingCoordinates.row},${j}`] = {
          ...coordinates[`${shipStartingCoordinates.row},${j}`],
          shipPlacedName: shipToPlace.name,
          isShipPlaced: true,
        };
      }
    } else {
      for (
        let i = shipStartingCoordinates.row;
        i < shipStartingCoordinates.row + shipToPlace.length;
        i += 1
      ) {
        coordinates[`${i},${shipStartingCoordinates.column}`] = {
          ...coordinates[`${i},${shipStartingCoordinates.column}`],
          shipPlacedName: shipToPlace.name,
          isShipPlaced: true,
        };
      }
    }

    ShipStored[shipToPlace.name] = shipToPlace;
  };

  const receiveAttack = function updateCoordinatesAndShipHitProperty(
    targetCoordinates
  ) {
    if (coordinates[targetCoordinates].hit === true) {
      return;
    }

    coordinates[targetCoordinates] = {
      ...coordinates[targetCoordinates],
      hit: true,
    };

    coordinatesNotYetHit = coordinatesNotYetHit.filter(
      (coordinate) => coordinate !== targetCoordinates
    );
    coordinatesHit.push(targetCoordinates);

    const targetedShipName = coordinates[targetCoordinates].shipPlacedName;

    if (!targetedShipName) {
      return;
    }

    ShipStored[targetedShipName].hit();
  };

  const isAttackValid = function checkIfGivenCoordinatesIsAValidAttack(
    attackCoordinates
  ) {
    const convertedAttackCoordinates = convertCoordinates(attackCoordinates);

    if (
      !isWithinRange(convertedAttackCoordinates.row) ||
      !isWithinRange(convertedAttackCoordinates.column)
    ) {
      return false;
    }

    if (coordinates[attackCoordinates].hit === true) {
      return false;
    }

    return true;
  };

  const allShipsSunk = function checkIfAllShipInsideShipStoreAreSunk() {
    const keys = Object.keys(ShipStored);

    for (const key of keys) {
      if (!ShipStored[key].isSunk()) {
        return false;
      }
    }

    return true;
  };

  return {
    get coordinates() {
      return coordinates;
    },
    get coordinatesHit() {
      return coordinatesHit;
    },
    get coordinatesNotYetHit() {
      return coordinatesNotYetHit;
    },
    placeShip,
    receiveAttack,
    allShipsSunk,
    isAttackValid,
  };
};

export default Gameboard;

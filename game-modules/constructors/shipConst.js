module.exports = function Ships(){
    return {
        patrol: {
            name: "Patrol Boat",
            coordinates: [],
            isSunk: false,
            icon: "P",
            blocks: 2
        },
        submarine: {
            name: "Submarine",
            coordinates: [],
            isSunk: false,
            icon: "S",
            blocks: 3
        },
        cruiser: {
            name: "Cruiser",
            coordinates: [],
            isSunk: false,
            icon: "C",
            blocks: 3
        },
        destroyer: {
            name: "Destroyer",
            coordinates: [],
            isSunk: false,
            icon: "D",
            blocks: 4
        },
        battleship: {
            name: "Battleship",
            coordinates: [],
            isSunk: false,
            icon: "B",
            blocks: 4
        },
        aircraftCarrier: {
            name: "Aircraft Carrier",
            coordinates: [],
            isSunk: false,
            icon: "A",
            blocks: 5
        }
    };
}
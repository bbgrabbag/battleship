var Grid = require("./gridConst");

module.exports = function Enemy (){
this.name = "The Evil Federal Planetary Navy"
this.grid = new Grid();
this.shipsSunk = [];
this.ships = [
    {
        name: "Patrol Boat",
        coordinates: [],
        isSunk: false,
        icon: "P",
        blocks: 2
    },
    {
        name: "Submarine",
        coordinates: [],
        isSunk: false,
        icon: "S",
        blocks: 3
    },
    {
        name: "Cruiser",
        coordinates: [],
        isSunk: false,
        icon: "C",
        blocks: 3
    },
    {
        name: "Destroyer",
        coordinates: [],
        isSunk: false,
        icon: "D",
        blocks: 4
    },
    {
        name: "Battleship",
        coordinates: [],
        isSunk: false,
        icon: "B",
        blocks: 4
    },
    {
        name: "Aircraft Carrier",
        coordinates: [],
        isSunk: false,
        icon: "A",
        blocks: 5
    }
];
};
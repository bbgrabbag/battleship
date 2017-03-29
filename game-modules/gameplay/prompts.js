var Game = require("../constructors/gameConst")
var ships = require("../constructors/shipConst");
module.exports = {
    currentGame: {},
    getShipNames: function () {
        var nameArray = [];
        for (ship in ships) {

            nameArray.push(ships[ship].name);
        }
        return nameArray;
    },
    direcArray: ["Horizontal", "Vertical"],
    positionPlayerShip: function (coordx, coordy, shipName, direction, player) {

        for (var i = 0; i < player.ships.length; i++) {
            if (shipName === player.ships[i].name) {
                shipName = player.ships[i];
            };
        };
        if (direction === "Horizontal") {

            if (coordx > 11 - shipName.blocks) {
                return ("Invalid Placement! Ship must fit within grid.");
            } else {
                var clear = true;
                for (var i = 0; i < shipName.blocks; i++) {
                    if (player.grid.coordinates[coordy - 1][(coordx - 1) + i].display !== "~") {
                        clear = !clear;
                        break;
                    };
                };
                if (!clear) {
                    return "Invalid placement! There is another ship occupying that coordinate!";
                } else {
                    for (var i = 0; i < shipName.blocks; i++) {
                        player.grid.coordinates[coordy - 1][(coordx - 1) + i].display = shipName.icon;
                        shipName.coordinates.push(player.grid.coordinates[coordy - 1][(coordx - 1) + i]);
                    };
                    return "Success!";
                };
            };
        } else if (direction === "Vertical") {
            if (coordy > 11 - shipName.blocks) {
                return("Invalid Placement! Ship must fit within grid.");
            } else {
                var clear = true;
                for (var i = 0; i < shipName.blocks; i++) {
                    if (player.grid.coordinates[(coordy - 1) + i][coordx - 1].display !== "~") {
                        clear = !clear;
                        break;
                    };
                };
                if (!clear) {
                    return("Invalid placement! There is another ship occupying that coordinate!");
                } else {
                    for (var i = 0; i < shipName.blocks; i++) {
                        player.grid.coordinates[(coordy - 1) + i][coordx - 1].display = shipName.icon;
                        shipName.coordinates.push(player.grid.coordinates[(coordy - 1) + i][coordx - 1]); 
                    };
                    return "Success!";
                };
            };
        };
    },
    positionEnemyShips: function (enemy) {
        var self = this;
        var randomizer = (x) => {
            return Math.ceil(Math.random() * x);
        };
        //picks ship: 
        for (ship in enemy.ships) {
            var clear = true;
            while (clear) {
                //pick random starting direction:
                if (randomizer(2) === 2) {
                    //horizontal:
                    var initCoord = { x: randomizer(10 - enemy.ships[ship].blocks), y: randomizer(10) };

                    //check if entire area is clear, if so place ship:
                    for (var i = 0; i < enemy.ships[ship].blocks; i++) {
                        if (enemy.grid.coordinates[initCoord.y - 1][(initCoord.x - 1) + i].isEnemy) {
                            clear = !clear;
                            break;
                        };

                    };
                    if (!clear) {
                        clear = !clear;
                        continue;
                    };
                    for (var i = 0; i < enemy.ships[ship].blocks; i++) {
                        enemy.grid.coordinates[initCoord.y - 1][(initCoord.x - 1) + i].isEnemy = true;
                        enemy.grid.coordinates[initCoord.y - 1][(initCoord.x - 1) + i].display = enemy.ships[ship].icon;
                        enemy.ships[ship].coordinates.push(enemy.grid.coordinates[initCoord.y - 1][(initCoord.x - 1) + i].coords);
                    };
                    break;
                } else {
                    //vertical:
                    var initCoord = { x: randomizer(10), y: randomizer(10 - enemy.ships[ship].blocks) };

                    //check if entire area is clear, if so place ship:
                    for (var i = 0; i < enemy.ships[ship].blocks; i++) {
                        if (enemy.grid.coordinates[(initCoord.y - 1) + i][initCoord.x - 1].isEnemy) {
                            clear = !clear;
                            break;
                        };

                    };
                    if (!clear) {
                        clear = !clear;
                        continue;
                    };
                    for (var i = 0; i < enemy.ships[ship].blocks; i++) {
                        enemy.grid.coordinates[(initCoord.y - 1) + i][initCoord.x - 1].isEnemy = true;
                        enemy.grid.coordinates[(initCoord.y - 1) + i][initCoord.x - 1].display = enemy.ships[ship].icon;
                        enemy.ships[ship].coordinates.push(enemy.grid.coordinates[(initCoord.y - 1) + i][initCoord.x - 1].coords);
                    };
                    break;
                };
            };
        };
    },
    displayPlayerGrid: function (player) {
        var displayGrid = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(player.grid.coordinates[i][j].display);
            };
            displayGrid.push(row);
        };
        console.log("\n" + player.name + ":");
        console.log(displayGrid);
    },
    displayEnemyGrid: function (enemy) {
        //shows only hits, waves, and misses
        var displayGrid = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(enemy.grid.coordinates[i][j].display);
            };
            displayGrid.push(row);
        };
        console.log("\n" + enemy.name + ":");
        console.log(displayGrid);
    },
    displayPlayerShips: function (player) {
        for (prop in player.ships) {
            var blockStatus = [];
            var shipCoordinates = []
            for (coord in player.ships[prop].coordinates) {
                var shipCoords = [];
                blockStatus.push(`[${player.ships[prop].coordinates[coord].display}]`);
                shipCoords.push(player.ships[prop].coordinates[coord].coords);
                for (xy in shipCoords) {
                    shipCoordinates.push(`(${shipCoords[xy].x},${shipCoords[xy].y})`);
                };
            };
            console.log(`\n${player.ships[prop].name}:\nSunk: ${player.ships[prop].isSunk}\nStatus: ${blockStatus}\nCoordinates: ${shipCoordinates}`);
        };
    }
};
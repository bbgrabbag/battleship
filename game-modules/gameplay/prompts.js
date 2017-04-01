var Game = require("../constructors/gameConst");
var rs = require("readline-sync");
var randomizer = (x) => {
    return Math.ceil(Math.random() * x);
};
module.exports = {
    currentGame: {},
    getShipNames: function (player) {
        var nameArray = [];
        for (ship in player.ships) {
            nameArray.push(player.ships[ship].name);
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
                return ("Invalid Placement! Ship must fit within grid.");
            } else {
                var clear = true;
                for (var i = 0; i < shipName.blocks; i++) {
                    if (player.grid.coordinates[(coordy - 1) + i][coordx - 1].display !== "~") {
                        clear = !clear;
                        break;
                    };
                };
                if (!clear) {
                    return ("Invalid placement! There is another ship occupying that coordinate!");
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
        for (ship in enemy.ships) {
            var clear = true;
            while (clear) {
                if (randomizer(2) === 2) {
                    var initCoord = { x: randomizer(10 - enemy.ships[ship].blocks), y: randomizer(10) };
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
                        enemy.ships[ship].coordinates.push(enemy.grid.coordinates[initCoord.y - 1][(initCoord.x - 1) + i]);
                    };
                    break;
                } else {
                    var initCoord = { x: randomizer(10), y: randomizer(10 - enemy.ships[ship].blocks) };
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
                        enemy.ships[ship].coordinates.push(enemy.grid.coordinates[(initCoord.y - 1) + i][initCoord.x - 1]);
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
        var displayGrid = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                if (enemy.grid.coordinates[i][j].display !== "~" && enemy.grid.coordinates[i][j].display !== "X" && enemy.grid.coordinates[i][j].display !== "O") {
                    row.push(enemy.grid.coordinates[i][j].enemyDisplay);
                } else {
                    row.push(enemy.grid.coordinates[i][j].display);
                }
            };
            displayGrid.push(row);
        };
        console.log("\n" + enemy.name + ":");
        console.log(displayGrid);
    },
    displayPlayerShips: function (player) {
        for (ship in player.ships) {
            var blockStatus = [];
            var shipCoordinates = [];
            for (coord in player.ships[ship].coordinates) {
                var shipCoords = [];
                blockStatus.push(`[${player.ships[ship].coordinates[coord].display}]`);
                shipCoords.push(player.ships[ship].coordinates[coord].coords);
                for (xy in shipCoords) {
                    shipCoordinates.push(`(${shipCoords[xy].x},${shipCoords[xy].y})`);
                };
            };          
            console.log(`\n${player.ships[ship].name}:\nSunk: ${player.ships[ship].isSunk}\nStatus: ${blockStatus}\nCoordinates: ${shipCoordinates}`);
        };
    },
    playerAttacks: function (player) {
        var message = "";
        var newLaunch = false;
        while (!newLaunch) {
            var coordSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var launchCoord = { x: rs.keyInSelect(coordSelect, "Choose your X coordinate") + 1, y: rs.keyInSelect(coordSelect, "Choose your Y coordinate") + 1 };
            if(coordSelect.indexOf(launchCoord.x)=== -1 || coordSelect.indexOf(launchCoord.y)=== -1){
                console.log("Invalid coordinate!");
                continue;
            };
            if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].isHit) {
                console.log(`That coordinate has already been targeted!`);
                continue;
            } else {
                player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].isHit = true;
                if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display !== "~") {
                    if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "P") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";

                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Patrol Boat"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            ship.isSunk = true;
                            message = `\nThe enemy's ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "S") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Submarine"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            message = `\nThe enemy's ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "C") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Cruiser"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            message = `\nThe enemy's ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "D") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Destroyer";
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            message = `\nThe enemy's ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "B") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Battleship"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            message = `\nThe enemy's ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "A") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Aircraft Carrier"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            message = `\nThe enemy's ${ship.name} has been sunk!\n`;
                        };
                    };
                    return `\nLaunch detected at (${launchCoord.x}, ${launchCoord.y})!\nDirect Hit!\n${message}`;
                    break;
                } else {
                    player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "O";
                    return `\nLaunch detected at (${launchCoord.x}, ${launchCoord.y})!\nMiss!\n`;
                }
            }
        }
    },
    enemyAttacks: function (player) {
        var message = "";
        var newLaunch = false;
        while (!newLaunch) {
            var launchCoord = { x: randomizer(10), y: randomizer(10) };
            if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].isHit) {
                continue;
            } else {
                player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].isHit = true;
                if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display !== "~") {
                    if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "P") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";

                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Patrol Boat"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            ship.isSunk = true;
                            message = `\nYour ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "S") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Submarine"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            ship.isSunk = true;
                            message = `\nYour ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "C") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Cruiser"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            ship.isSunk = true;
                            message = `\nYour ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "D") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Destroyer";
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            ship.isSunk = true;
                            message = `\nYour ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "B") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Battleship"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            ship.isSunk = true;
                            message = `\nYour ${ship.name} has been sunk!\n`;
                        };
                    } else if (player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display === "A") {
                        player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "X";
                        var ship = player.ships.filter(function (ship) {
                            return ship.name === "Aircraft Carrier"
                        })[0];
                        var isSunk = false;
                        for (coord in ship.coordinates) {
                            if (ship.coordinates[coord].display === "X") {
                                isSunk = true;
                            } else {
                                isSunk = false;
                                break;
                            };
                        };
                        if (isSunk) {
                            player.shipsSunk.push(ship);
                            ship.isSunk = true;
                            message = `\nYour ${ship.name} has been sunk!\n`;
                        };
                    };
                    return `\nLaunch detected at (${launchCoord.x}, ${launchCoord.y})!\nYou've been hit!\n${message}`;
                    break;
                } else {
                    player.grid.coordinates[launchCoord.y - 1][launchCoord.x - 1].display = "O";
                    return `\nLaunch detected at (${launchCoord.x}, ${launchCoord.y})!\nMiss!\n`;
                }
            }
        }
    }
}
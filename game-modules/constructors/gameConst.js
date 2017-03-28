var Player = require("./playerConst");
var Enemy = require("./enemyConst")

module.exports = function Game(name) {
    var self = this;
    this.player = new Player(name);
    this.enemy = new Enemy();

    //setup methods:
    this.positionPlayerShip = function (coordy, coordx, boatType, direction) {
        if (direction === "horiz") {
            if (coordx > 11 - self.player.ships[boatType].blocks) {
                console.log("Invalid Placement! Ship must fit within grid.");
            } else {
                var clear = true;
                for (var i = 0; i < self.player.ships[boatType].blocks; i++) {
                    if (self.player.grid.coordinates[coordy - 1][(coordx - 1) + i].display !== "~") {
                        clear = !clear;
                        break;
                    };
                };
                if (!clear) {
                    console.log("Invalid placement! There is another ship occupying that coordinate!");
                } else {
                    for (var i = 0; i < self.player.ships[boatType].blocks; i++) {
                        self.player.grid.coordinates[coordy - 1][(coordx - 1) + i].display = self.player.ships[boatType].icon;
                        self.player.ships[boatType].coordinates.push(self.player.grid.coordinates[coordy - 1][(coordx - 1) + i]);
                    };
                };
            };
        } else if (direction === "vert") {
            if (coordy > 11 - self.player.ships[boatType].blocks) {
                console.log("Invalid Placement! Ship must fit within grid.");
            } else {
                var clear = true;
                for (var i = 0; i < self.ships[boatType].blocks; i++) {
                    if (self.player.grid.coordinates[(coordy - 1) + i][coordx - 1].display !== "~") {
                        clear = !clear;
                        break;
                    };
                };
                if (!clear) {
                    console.log("Invalid placement! There is another ship occupying that coordinate!");
                } else {
                    for (var i = 0; i < self.ships[boatType].blocks; i++) {
                        self.player.grid.coordinates[(coordy - 1) + i][coordx - 1].display = self.player.ships[boatType].icon;
                        self.player.ships[boatType].coordinates.push(self.player.grid.coordinates[(coordy - 1) + i][coordx - 1]);
                    };
                };
            };
        };
    };
    this.positionEnemyShips = function (enemy) {
        var self = this;
        var randomizer = function (x) {
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
    };

    //display methods:
    this.displayPlayerGrid = function () {
        var displayGrid = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(self.player.grid.coordinates[i][j].display);
            };
            displayGrid.push(row);
        };
        console.log("\n" + self.player.name + ":");
        console.log(displayGrid);
    };
    this.displayEnemyGrid = function () {
        //shows only hits, waves, and misses
        var displayGrid = [];
        for (var i = 0; i < 10; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(self.enemy.grid.coordinates[i][j].display);
            };
            displayGrid.push(row);
        };
        console.log("\n" + self.enemy.name + ":");
        console.log(displayGrid);
    };
    this.displayPlayerShips = function () {
        for (prop in self.player.ships) {
            var blockStatus = [];
            var shipCoordinates = []
            for (coord in self.player.ships[prop].coordinates) {
                var shipCoords = [];
                blockStatus.push(`[${self.player.ships[prop].coordinates[coord].display}]`);
                shipCoords.push(self.player.ships[prop].coordinates[coord].coords);
                for (xy in shipCoords) {
                    shipCoordinates.push(`(${shipCoords[xy].x},${shipCoords[xy].y})`);
                };
            };
            console.log(`\n${self.player.ships[prop].name}:\nSunk: ${self.player.ships[prop].isSunk}\nStatus: ${blockStatus}\nCoordinates: ${shipCoordinates}`);
        };
    };
};
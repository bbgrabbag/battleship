var rs = require("readline-sync");
var Game = require("./game-modules/constructors/gameConst");
var gameplay = require("./game-modules/gameplay/prompts");

console.log("\nWELCOME TO BATTLESHIP NODEJS\n");
gameplay.currentGame = new Game(rs.question("What is your name?"));
var tempArray = gameplay.getShipNames(gameplay.currentGame.player);
while (tempArray.length) {
    var shipSelection = rs.keyInSelect(tempArray, "Choose the ship you wish to place");
    var direcSelection = rs.keyInSelect(gameplay.direcArray, "Choose direction");
    var xCoordSelection = rs.question("Enter X coordinate");
    var yCoordSelection = rs.question("Enter Y coordinate");
    if (!xCoordSelection || !yCoordSelection) {
        console.log("\nYou must enter a valid coordinate!");
        continue;
    };
    var message = gameplay.positionPlayerShip(xCoordSelection, yCoordSelection, tempArray[shipSelection], gameplay.direcArray[direcSelection], gameplay.currentGame.player);
    console.log("\n" + message);
    if (message != "Success!") continue;
    tempArray.splice(shipSelection, 1);
    gameplay.displayPlayerGrid(gameplay.currentGame.player);
};
gameplay.positionEnemyShips(gameplay.currentGame.enemy);
gameplay.displayEnemyGrid(gameplay.currentGame.enemy);

console.log("\nBlast! The Evil Planetary Navy has arrived!\n");
var gameOn = true;
while (gameOn) {
    rs.question("\nPrepare your defenses! Press 'ENTER' to continue\n");
    console.log(gameplay.enemyAttacks(gameplay.currentGame.player));
    gameplay.displayPlayerGrid(gameplay.currentGame.player);
    if (gameplay.currentGame.player.shipsSunk.length === 6) {
        console.log("\nYour fleet has been destroyed!\n");
        break;
    };
    var query = rs.keyInYN("Would you like to see your fleet status?");
    if (query) {
        gameplay.displayPlayerShips(gameplay.currentGame.player);
    };
    gameplay.displayEnemyGrid(gameplay.currentGame.enemy);
    console.log(gameplay.playerAttacks(gameplay.currentGame.enemy));
    gameplay.displayEnemyGrid(gameplay.currentGame.enemy);
    if (gameplay.currentGame.enemy.shipsSunk.length === 6) {
        console.log("\nYou destroyed the enemy fleet!\n");
        break;
    };
};





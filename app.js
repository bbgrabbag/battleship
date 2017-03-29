var rs = require("readline-sync");
var Game = require("./game-modules/constructors/gameConst");
var gameplay = require("./game-modules/gameplay/prompts");
var ships = require("./game-modules/constructors/shipConst");

gameplay.currentGame = new Game(rs.question("What is your name?"));
var tempArray = gameplay.getShipNames();
while (tempArray.length) {

    var shipSelection = rs.keyInSelect(tempArray, "Choose the ship you wish to place");
    var direcSelection = rs.keyInSelect(gameplay.direcArray, "Choose direction");
    var xCoordSelection = rs.question("Enter X coordinate");
    var yCoordSelection = rs.question("Enter Y coordinate");
    var message = gameplay.positionPlayerShip(xCoordSelection, yCoordSelection, tempArray[shipSelection], gameplay.direcArray[direcSelection], gameplay.currentGame.player);
    
    console.log("\n" + message);
    if (message != "Success!") continue;
    tempArray.splice(shipSelection, 1);
    gameplay.displayPlayerGrid(gameplay.currentGame.player);
};
gameplay.positionEnemyShips(gameplay.currentGame.enemy);
gameplay.displayEnemyGrid(gameplay.currentGame.enemy);
gameplay.displayPlayerGrid(gameplay.currentGame.player);

//game starts:
//first move randomly chosen
//player enters coordinate of launch, or if enemy, randomly chosen
//hit or miss determined from game state
//if hit, determine which block and whether it is sunk, and whether any more ships are still afloat
//game proceeds until no more ships belong to one player
//menu options:
//check status of all ships (returns a list of all ships, the hit status of each ships's block and the sink status), exit game, 







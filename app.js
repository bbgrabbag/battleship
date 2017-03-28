var rs = require("readline-sync");
var Game = require("./game-modules/constructors/gameConst");
//intro:
    //get player name
    //place ships: (2)two-block, (2)three-block, (2)four-block, (1)5-block
    //user gets to choose direction, starting coordinate for each ship.
//game starts:
    //first move randomly chosen
    //player enters coordinate of launch, or if enemy, randomly chosen
    //hit or miss determined from game state
    //if hit, determine which block and whether it is sunk, and whether any more ships are still afloat
    //game proceeds until no more ships belong to one player
//menu options:
    //check status of all ships (returns a list of all ships, the hit status of each ships's block and the sink status), exit game, 

var currentGame = new Game("Ben");
currentGame.positionPlayerShip(1,1, "patrol", "horiz");
currentGame.positionPlayerShip(2,1, "submarine", "horiz");
currentGame.positionPlayerShip(3,1, "cruiser", "horiz");
currentGame.positionPlayerShip(4,1, "destroyer", "horiz");
currentGame.positionPlayerShip(5,1, "battleship", "horiz");
currentGame.positionPlayerShip(6,1, "aircraftCarrier", "horiz");

currentGame.displayPlayerGrid();
currentGame.displayPlayerShips();

currentGame.positionEnemyShips(currentGame.enemy);
currentGame.displayEnemyGrid();





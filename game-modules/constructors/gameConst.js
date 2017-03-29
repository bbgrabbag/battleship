var Player = require("./playerConst");
var Enemy = require("./enemyConst")

module.exports = function Game(name) {
    var self = this;
    this.player = new Player(name);
    this.enemy = new Enemy();
    
};
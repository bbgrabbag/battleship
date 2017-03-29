var Grid = require("./gridConst");
var ships = require("./shipConst.js");

module.exports = function Player(name) {
    this.name = name;
    this.grid = new Grid();
    this.ships = ships;
};
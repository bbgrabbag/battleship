var Grid = require("./gridConst");
var Ships = require("./shipConst.js");

module.exports = function Player(name) {
    var self = this;
    this.name = name;
    this.grid = new Grid();
    this.ships = new Ships();
};
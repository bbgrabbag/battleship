var Grid = require("./gridConst");
var ships = require("./shipConst");

module.exports = function Enemy (){
this.name = "The Evil Federal Planetary Navy"
this.grid = new Grid();
this.ships = ships;
};
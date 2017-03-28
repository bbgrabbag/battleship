var Grid = require("./gridConst");
var Ships = require("./shipConst");

module.exports = function Enemy (){
this.name = "The Evil Federal Planetary Navy"
this.grid = new Grid();
this.ships = new Ships();
};
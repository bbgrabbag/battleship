
var createGrid = function () {
    
    var grid = [];
    for (var i = 0; i < 10; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
            row.push({ 
    isEnemy: false,
    isHit: false,
    isMiss: false,
    display: "~",
    coords: {y : i + 1, x : j + 1}
});
        };
        grid.push(row);
    };
    return grid;
};

module.exports = function Grid() {
    this.coordinates = createGrid();
};
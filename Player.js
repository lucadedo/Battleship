//const GameBoard = require("./gameBoard");


const Player = function(name, turn) {
    this.name = name;
    this.turn = turn;   
 
    this.switchTurn = function() {
        this.turn = !this.turn ;
    };

    this.attack = function(x, y) {
        return [x, y];
    };
    
};

export { Player };

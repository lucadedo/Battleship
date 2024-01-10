const GameBoard = require("./gameBoard");


const Player = function(name, turn) {
    this.name = name;
    this.turn = turn;   
 
    this.switchTurn = function() {
        this.turn = !this.turn ;
    };

    this.attack = function(x, y) {
        console.log(x,y);
        this.switchTurn();
        return x,y;
    };

};
const luca = new Player('luca',true);
const PC = new Player('captain PC', false);


//luca.switchTurn()
// luca.attack(1,2);
// console.log(luca);

module.exports = Player;

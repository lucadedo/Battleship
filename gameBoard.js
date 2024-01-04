const Ship = require("./ship");




// const createCordinate = function(x, y) {
//         this.x = x,
//         this.y = y
// }


const GameBoard = function() {
    
    const board = new Array(10).fill(null).map(() => Array(10).fill(null));// 2D board

    const carrier5 = new Ship(5, true ,0);
    const battleship4 = new Ship(4, true ,0);
    const cruiser3 = new Ship(3, true,0);
    const submarine3 = new Ship(3, true,0);
    const destroyer2 =new Ship(2, false,0);
    
    let allShips = [carrier5,battleship4,cruiser3,submarine3,destroyer2];
    let targetShip;


    this.chooseShip = function(num){
        targetShip = allShips[num];
    };
    
    this.placeShip = function(x ,y) {

        if (x >= 0 && x < 10 && y >= 0 && y < 10 ) {
           
            for (let i = 0; i < targetShip.length; i++){
                board[x][i + y] = targetShip;
            }
            console.log(board);
            

        }else{
            throw new Error('cant place here ');
        }
    }
    this.receiveAttack = function(x,y) {
        if (board[x][y] !== null && board[x][y] == targetShip) {
            board[x][y].hit();
            console.log(`hit! at (${x},${y})`);
            console.log(board)
            this.allShipSunk(); //check if all ships sunk
        }else if(board[x][y] === null){
            let missed = {missedX:x,missedY:y};
            board[x][y] = missed;
            console.log(`you missed! at (${x},${y})`);
            console.log(board)
        }else{
            throw new Error('point already hitted')
        }
        
    };
    this.displayBoard = function() {
        console.log(board);
    };

    this.allShipSunk = function() {
       let allTrue = allShips.every((obj) => obj.sunk === true); 
       if (allTrue) {
        console.log("game over");
       }
        
    }
    

}

const gameBoard = new GameBoard();
gameBoard.chooseShip(4);
gameBoard.placeShip(0,2);

gameBoard.receiveAttack(0,2);
gameBoard.receiveAttack(0,3);

//gameBoard.displayBoard()











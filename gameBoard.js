const Ship = require("./ship");




// const createCordinate = function(x, y) {
//         this.x = x,
//         this.y = y
// }


const GameBoard = function() {
    
    const board = new Array(10).fill(null).map(() => Array(10).fill(null));// 2D board

    const carrier5 = new Ship(5, false ,0);
    const battleship4 = new Ship(4, false ,0);
    const cruiser3 = new Ship(3, false,0);
    const submarine3 = new Ship(3, false,0);
    const destroyer2 =new Ship(2, false,0);
    
    let allShips = [carrier5,battleship4,cruiser3,submarine3,destroyer2];
    let targetShip;
    let shipDirectionHorizontal = true;
    let shipDirectionVertical = false;


    this.chooseShip = function(num){
        targetShip = allShips[num];
    };
    
    this.placeShip = function(x ,y) {

        if (x >= 0 && x < 10 && y >= 0 && y < 10 ) {

            if (shipDirectionHorizontal) { 
                if (this.checkIfPlaceOutside(x) && this.checkIfShipOnHorizontal(x,y)) { //check if horizontal is placeable && if there is ship around
                    for (let i = 0; i < targetShip.length; i++){
                        board[i + x][y] = targetShip; //place horizontal
                    };
                }else{
                    console.log("validate error,cant palce here 2"); 
                };
                
            }else if (shipDirectionVertical) {
                if (this.checkIfPlaceOutside(y) && this.checkIfShipOnVertical(x,y)) {//check if vertical is placeable && if there is ship around
                    for (let i = 0; i < targetShip.length; i++){
                        board[x][i + y] = targetShip; //place vertical
                    };
            }else{
                console.log("validate error,cant palce here 2"); 
            };
            };
            //console.log(board);
            
        }else{
            throw new Error('cant place here ');
        };
    };

    this.checkIfPlaceOutside = function(xy) { //check x or y ,depends on what it takes ,is the same
        if ((targetShip.length > 4 && xy >= 6) ||
            (targetShip.length > 3 && xy >= 7) ||
            (targetShip.length > 2 && xy >= 8) ||
            (targetShip.length == 2 && xy == 9)) {
                console.log('validate error,cant palce here 1');
                return false;
            }else{
                return true;
            };
    };

    this.checkIfShipOnHorizontal = function(x,y) {
        for (let i = 0; i < targetShip.length; i++){
            if (board[x + i][y] !== null) {
                console.log('ships on Horizontal, cant place here!');
                return false;
            };
        };
        return true;
    };
    this.checkIfShipOnVertical = function(x,y) {
        for (let i = 0; i < targetShip.length; i++){
            if (board[x][y + i] !== null) {
                console.log('ships on Vertical, cant place here!');
                return false;
            };
        };
        return true;
    };

    this.changeShipDirection = function(){
        if (shipDirectionHorizontal === true) {
            shipDirectionVertical = true;
            shipDirectionHorizontal = false;
        }else{
            shipDirectionHorizontal = true;
            shipDirectionVertical = false;
        };
    };


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
    };
    
};

const gameBoard = new GameBoard();
//start with horizontal direction X
gameBoard.chooseShip(0); // size of 5
gameBoard.changeShipDirection(); // switch to vertical dir Y
gameBoard.placeShip(0,0); // (0,0)(0,1)(0,2)(0,3)(0,4)
gameBoard.chooseShip(1);//size of 4
gameBoard.changeShipDirection();
gameBoard.placeShip(1,0); //(1,0)(2,0)(3,0)(4,0)

// gameBoard.receiveAttack(0,2);
// gameBoard.receiveAttack(0,3);

gameBoard.displayBoard()











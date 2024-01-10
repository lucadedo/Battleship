const GameBoard = require("./gameBoard");
const Player = require("./Player");

const luca = new Player('luca',true);
const PC = new Player('captain PC', false);

const playerGameBoard = new GameBoard();
const enemyGameBoard = new GameBoard();


function startGame() { 
        buildPlayerboardTest();
        buildBoardPC();

        

        while(!enemyGameBoard.allShipSunk() || !playerGameBoard.allShipSunk()){
            if (luca.turn) {
                let att = luca.attack(1,1)
                enemyGameBoard.receiveAttack(att[0],att[1]);
                luca.switchTurn();
                PC.switchTurn();
            }else if (PC.turn) {
                let att2 = PC.attack(2,3)
                playerGameBoard.receiveAttack(att2[0],att2[1]);
                PC.switchTurn();
                luca.switchTurn();
            }else{
                throw new Error('something went wrong')
            };
           
           
        };

        console.log('STOP');
};




function buildPlayerboardTest() {
       //horizontal
       playerGameBoard.chooseShip(0);
       playerGameBoard.placeShip(0,0);
       playerGameBoard.chooseShip(1);
       playerGameBoard.placeShip(2,2);
       playerGameBoard.chooseShip(2);
       playerGameBoard.placeShip(7,4);
       //vertical
       playerGameBoard.chooseShip(3);
       playerGameBoard.changeShipDirection()
       playerGameBoard.placeShip(2,5);
       playerGameBoard.chooseShip(4);
       playerGameBoard.placeShip(5,7);
       console.log('PLAYER BOARD:');                         
       playerGameBoard.displayBoard();
   
};


function buildBoardPC() {
    //horizontal
    enemyGameBoard.chooseShip(0);
    enemyGameBoard.placeShip(1,1);
    enemyGameBoard.chooseShip(1);
    enemyGameBoard.placeShip(4,3);
    enemyGameBoard.chooseShip(2);
    enemyGameBoard.placeShip(6,5);
    //vertical
    enemyGameBoard.chooseShip(3);
    enemyGameBoard.changeShipDirection()
    enemyGameBoard.placeShip(1,4);
    enemyGameBoard.chooseShip(4);
    enemyGameBoard.placeShip(3,7);
    console.log('PC BOARD:');
    enemyGameBoard.displayBoard();

    
};


startGame()



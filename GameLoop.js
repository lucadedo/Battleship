import { GameBoard } from './gameBoard.js';
import { Player } from './Player.js';



const GameLoop = function(player) { 
    
    console.log(player);
    
    const playerGameBoard = new GameBoard();

    this.startTurn = function () {
        while(!enemyGameBoard.allShipSunk() || !playerGameBoard.allShipSunk()){
            if (player.turn) {
                let att = luca.attack(1,1)
                enemyGameBoard.receiveAttack(att[0],att[1]);
                player.switchTurn();
                PC.switchTurn();
                console.log('LUCA ATTACKED');
            }else if (PC.turn) {
                let att2 = PC.attack(2,3)
                playerGameBoard.receiveAttack(att2[0],att2[1]);
                PC.switchTurn();
                player.switchTurn();
                console.log('PC ATTACKED');
            }else{
                throw new Error('something went wrong')
            };
        }; 
        console.log('STOP');
    };


    this.buildPlayerboardTest = function () {
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


    this.buildBoardPC = function () {
        //horizontal
        playerGameBoard.chooseShip(0);
        playerGameBoard.placeShip(1,1);
        playerGameBoard.chooseShip(1);
        playerGameBoard.placeShip(4,3);
        playerGameBoard.chooseShip(2);
        playerGameBoard.placeShip(6,5);
        //vertical
        playerGameBoard.chooseShip(3);
        playerGameBoard.changeShipDirection()
        playerGameBoard.placeShip(1,4);
        playerGameBoard.chooseShip(4);
        playerGameBoard.placeShip(3,7);
        console.log('PC BOARD:');
        playerGameBoard.displayBoard();

    
    };
    this.renderPlayerBoard = function () {
        return playerGameBoard.displayBoard();
    }

};

export { GameLoop };
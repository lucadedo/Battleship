import { GameBoard } from './gameBoard.js';
//import { Player } from './Player.js';



const GameLoop = function(player,PC) { 
   
    
    const playerGameBoard = new GameBoard();
    const enemyGameBoard = new GameBoard();
    console.log(playerGameBoard);

    
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

    this.buildPlayerboard = function () {
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
       //playerGameBoard.displayBoard();
     
       const playergameBoardDiv = document.getElementById("playergameBoard-div");
       const newPlayerGameboard = playerGameBoard.displayBoard();
       newPlayerGameboard.forEach((row,rowIndex) => {
        //console.log(newPlayerGameboard);
        const rowDiv = document.createElement('div');
        rowDiv.className = "x";
        rowDiv.id = "x" + rowIndex;

        row.forEach((cell, cellIndex) => {
        
        const cellDiv = document.createElement('div');
        cellDiv.className = "y";
        cellDiv.id = "y" + cellIndex;
        if (cell !== null) {
            cellDiv.classList.add("ship");
        };
        rowDiv.appendChild(cellDiv);

       });
      
        playergameBoardDiv.appendChild(rowDiv);
       
        
        });
        console.log('PLAYER BOARD:',newPlayerGameboard);
    };


    this.buildBoardPC = function () {
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
        
        //playerGameBoard.displayBoard();

        const enemygameBoardDiv = document.getElementById("enemygameBoard-div");
        const newEnemyGameboard = enemyGameBoard.displayBoard();
        newEnemyGameboard.forEach((row,rowIndex) => {
            //console.log(newEnemyGameboard);
            const rowDiv = document.createElement('div');
            rowDiv.className = "x";
            rowDiv.id = "x" + rowIndex;
    
            row.forEach((cell, cellIndex) => {
            
            const cellDiv = document.createElement('div');
            cellDiv.className = "y";
            cellDiv.id = "y" + cellIndex;
            if (cell !== null) {
                cellDiv.classList.add("ship");
            };
            rowDiv.appendChild(cellDiv);
    
           });
          
            enemygameBoardDiv.appendChild(rowDiv);
         
            
        });
        console.log('PC BOARD:',newEnemyGameboard);
    };


    this.renderPlayerBoard = function () {
        return playerGameBoard.displayBoard();
    };

    

};

export { GameLoop };
import { GameBoard } from './gameBoard.js';
//import { Player } from './Player.js';



const GameLoop = function(player,PC) { 

    
    this.startTurn = function () {
        while(!enemyGameBoard.allShipSunk() || !playerGameBoard.allShipSunk()){
            if (player.turn) {
                let att = player.attack(1,1)
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

    this.shipsDeploy = function (board) {

        let ships = ['Carrier','Battleship','Cruiser','Submarine','Destroyer'];  
        for (let i = 0; i < ships.length; i++){
            let isValidInput = false;
            let shipCoordinates;
            board.chooseShip(i)
            // while (!isValidInput) {
            //     shipCoordinates = prompt(`Place your ${ships[i]} (Enter coordinates in the format x,y)`);
    
            //     if (/^\d,\d$/.test(shipCoordinates)) {
            //         isValidInput = true;
            //     } else {
            //         alert('Please enter coordinates in the correct format (e.g., 0,0).');
            //     };
            // };
            //     let [x, y] = shipCoordinates.split(',').map(coord => parseInt(coord));
            //     board.placeShip(x,y);
            //     console.log(`Placed ${ships[i]} at coordinates (${x}, ${y})`);
        };
        
       
        // //horizontal
        // board.chooseShip(0);
        // board.placeShip(0,0);
        // board.chooseShip(1)
        // board.placeShip(2,2);
        // board.chooseShip(2);
        // board.placeShip(7,4);
        // //vertical
        // board.chooseShip(3);
        // board.changeShipDirection()
        // board.placeShip(2,5);
        // board.chooseShip(4);
        // board.placeShip(5,7);
        // console.log(board);
    
    };




    this.buildPlayerboard = function () {
        
        var playerGameBoard = new GameBoard();
        this.shipsDeploy(playerGameBoard);                    
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
        cellDiv.addEventListener('click',() =>{console.log(rowIndex,cellIndex);})

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
        var enemyGameBoard = new GameBoard();
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
            cellDiv.addEventListener('click',() =>{console.log(rowIndex,cellIndex);})
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
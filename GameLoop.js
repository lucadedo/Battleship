import { GameBoard } from './gameBoard.js';
//import { Player } from './Player.js';



const GameLoop = function(player,PC) { 

    var playerGameBoard = new GameBoard();
    var enemyGameBoard = new GameBoard();

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

    this.shipsDeploy = function () {

        
        let board = playerGameBoard.displayBoard()// only to render
        let ships = ['Carrier','Battleship','Cruiser','Submarine','Destroyer'];  
        let shipFlag = 0;
        //create deploy board
        const gameBoardSection = document.querySelector('#gameBoard-sec')
        let boardDeployDiv = document.createElement('div');
        boardDeployDiv.setAttribute('id','deploy-board');    

        //print out ships name
        const PrintOutShipDiv = document.getElementById('start-up-bar');
        const PrintOutShipName = document.createElement('p');
        PrintOutShipName.setAttribute('id','print-out-text');
        PrintOutShipName.innerText = `Place your ${ships[shipFlag]}.`;
        PrintOutShipDiv.appendChild(PrintOutShipName);
        

        // change direction button
        const rotateButton = document.createElement('button');
        rotateButton.setAttribute('id','rotate-btn');
        rotateButton.setAttribute('type','button');
        rotateButton.innerText = 'ROTATE';
        PrintOutShipDiv.appendChild(rotateButton);
        rotateButton.addEventListener('click',()=>{playerGameBoard.changeShipDirection()})// change ship direction

        board.forEach((row,rowIndex) => {
                //console.log(newPlayerGameboard);
                const rowDiv = document.createElement('div');
                rowDiv.className = "board-row";
                rowDiv.id = "board-row" + rowIndex;
        
                row.forEach((cell, cellIndex) => {
                
                const cellDiv = document.createElement('div');
                cellDiv.className = "board-cell";
                cellDiv.id = "board-cell" + cellIndex;
                
                cellDiv.addEventListener('click',() => {
                    console.log(board);
                    console.log(rowIndex,cellIndex);
                    if (playerGameBoard.shipDirectionHorizontal) {
                        if (playerGameBoard.checkIfPlaceOutside(rowIndex) && 
                            playerGameBoard.checkIfShipOnHorizontal(rowIndex,cellIndex)
                        ) {
                            let currentShip = playerGameBoard.getCurrentShip(shipFlag);//print current ship
                            console.log(currentShip.length);
                            shipFlag++;
                            PrintOutShipName.innerText = `Place your ${ships[shipFlag]}.`;
                            playerGameBoard.placeShip(rowIndex,cellIndex);
                            playerGameBoard.chooseShip();
                        };
                    }else if (playerGameBoard.shipDirectionVertical) { //check if horizontal is placeable && if there is ship around
                                if (playerGameBoard.checkIfPlaceOutside(cellIndex) &&
                                playerGameBoard.checkIfShipOnVertical(rowIndex,cellIndex)) {
                                    let currentShip = playerGameBoard.getCurrentShip(shipFlag);//print current ship
                                    console.log(currentShip.length);
                                    shipFlag++;
                                    PrintOutShipName.innerText = `Place your ${ships[shipFlag]}.`;
                                    playerGameBoard.placeShip(rowIndex,cellIndex);
                                    playerGameBoard.chooseShip();
                                }
                    
                }else {
                    alert('cant place here!');
                    
                };
                
                    if (playerGameBoard.allPlaced) {
                        this.buildPlayerboard(playerGameBoard);
                        boardDeployDiv.remove();
                        this.buildBoardPC();
                        PrintOutShipDiv.remove()
                    };
                });
                rowDiv.appendChild(cellDiv);
        
               });
              
               boardDeployDiv.appendChild(rowDiv);
               gameBoardSection.appendChild(boardDeployDiv)
               
             
            });
    
    };

    this.buildPlayerboard = function (playerGameBoard) {
        
        //if (!this.shipsDeploy(playerGameBoard)) return false;               
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
        playergameBoardDiv.style.backgroundColor = 'rgb(32, 127, 235,0.6)';
        
        });
        console.log('PLAYER BOARD:',newPlayerGameboard);
        
    };


    this.buildBoardPC = function () {
        
        //horizontal
        
        enemyGameBoard.placeShip(1,1);
        enemyGameBoard.chooseShip();
        enemyGameBoard.placeShip(4,3);
        enemyGameBoard.chooseShip();
        enemyGameBoard.placeShip(6,5);
        //vertical
        enemyGameBoard.chooseShip();
        enemyGameBoard.changeShipDirection()
        enemyGameBoard.placeShip(1,4);
        enemyGameBoard.chooseShip();
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
            enemygameBoardDiv.style.backgroundColor = 'rgb(32, 127, 235,0.6)';
            
        });
        console.log('PC BOARD:',newEnemyGameboard);
    };




    this.boardForDeploy = function () {
        const gameBoardSection = document.querySelector('#gameBoard-sec')
        let boardDeployDiv = document.createElement('div');
        boardDeployDiv.setAttribute('id','deploy-board');
        for (var i = 0; i < 10; i++) {
            var row = document.createElement('div');
            row.className = 'board-row';

            for (var j = 0; j < 10; j++) {
                var cell = document.createElement('div');
                cell.className = 'board-cell';
                cell.id =  i + '-' + j;
                cell.addEventListener('click', function() {
                    let [x, y] = this.id.split('-').map(coord => parseInt(coord));
                    
                });

                row.appendChild(cell);
                };
               
                boardDeployDiv.appendChild(row);
                gameBoardSection.appendChild(boardDeployDiv)
                
            };
        };


 




    this.renderPlayerBoard = function () {
        return playerGameBoard.displayBoard();
    };

    

};

export { GameLoop };
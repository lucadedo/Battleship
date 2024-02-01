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
                const rowDiv = document.createElement('div');
                rowDiv.className = "board-row";
                rowDiv.id = rowIndex;
                
                row.forEach((cell, cellIndex) => {
                
                const cellDiv = document.createElement('div');
                cellDiv.className = "board-cell";
                cellDiv.id = rowIndex +'-'+ cellIndex;
                
                cellDiv.addEventListener('mouseover', (e) => {
                    const hoveredCell = e.target;
                    let currentShip = playerGameBoard.getCurrentShip(shipFlag);
                    const [row, col] = hoveredCell.id.split('-').map(coord => parseInt(coord));
                    if (playerGameBoard.shipDirectionHorizontal) {
                        for (let i = Math.max(0, row); i <= Math.min(row + currentShip.length - 1, 10 - 1); i++) {
                            const adjacentCell = document.getElementById(`${i}-${col}`);//adjacent horizontal,add background
                            adjacentCell.style.backgroundColor = 'lightblue';
                        };
                    }else{
                        for (let i = Math.max(0, col); i <= Math.min(col + currentShip.length - 1, 10 - 1); i++) {
                            const adjacentCell = document.getElementById(`${row}-${i}`);//adjacent vertical,add background
                            adjacentCell.style.backgroundColor = 'lightblue';
                        };
                    };
                  
                });
                cellDiv.addEventListener('mouseout', (e) =>{
                    const outCell = e.target;
                    let currentShip = playerGameBoard.getCurrentShip(shipFlag);
                    const [row, col] = outCell.id.split('-').map(coord => parseInt(coord));
                    if (playerGameBoard.shipDirectionHorizontal) {
                        for (let i = Math.max(0, row); i <= Math.min(row + currentShip.length, 10 - 1); i++) {
                            const adjacentCell = document.getElementById(`${i}-${col}`);//adjacent horizontal,remove background
                            adjacentCell.style.backgroundColor = 'white';
                            };
                    }else{
                        for (let i = Math.max(0, col); i <= Math.min(col + currentShip.length, 10 - 1); i++) {
                            const adjacentCell = document.getElementById(`${row}-${i}`);//adjacent vertical,remove background
                            adjacentCell.style.backgroundColor = 'white';
                        };
                    };
                });


                cellDiv.addEventListener('click',(e) => {
                    console.log(board);
                    console.log(rowIndex,cellIndex);
                    if (playerGameBoard.shipDirectionHorizontal) {// ship placing validation
                        if (playerGameBoard.checkIfPlaceOutside(rowIndex) && 
                            playerGameBoard.checkIfShipOnHorizontal(rowIndex,cellIndex)
                        ) {
                         
                            shipFlag++;
                            PrintOutShipName.innerText = `Place your ${ships[shipFlag]}.`;
                            playerGameBoard.placeShip(rowIndex,cellIndex);
                            playerGameBoard.chooseShip();
                        };
                    }else if (playerGameBoard.shipDirectionVertical) { //check if vertical is placeable && if there is ship around
                                if (playerGameBoard.checkIfPlaceOutside(cellIndex) &&
                                playerGameBoard.checkIfShipOnVertical(rowIndex,cellIndex)) {
                                    //let currentShip = playerGameBoard.getCurrentShip(shipFlag);//print current ship
                                    //console.log(currentShip.length);
                                    shipFlag++;
                                    PrintOutShipName.innerText = `Place your ${ships[shipFlag]}.`;
                                    playerGameBoard.placeShip(rowIndex,cellIndex);
                                    playerGameBoard.chooseShip();
                                };
                    
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

    this.renderPlayerBoard = function () {
        return playerGameBoard.displayBoard();
    };

    

};

export { GameLoop };
import { GameBoard } from './gameBoard.js';
import { Ship } from './ship.js';
//import { Player } from './Player.js';



const GameLoop = function(player,PC) { 

    var playerGameBoard = new GameBoard();
    var enemyGameBoard = new GameBoard();

    const PrintOutPlace = document.getElementById('gameBoard-sec');
    var PrintOutText = document.createElement('div');
    PrintOutText.setAttribute('id','print-out-text2');
    PrintOutPlace.appendChild(PrintOutText);

    
    this.startTurn = function () {
        
        const enemyBoard = document.querySelector('#enemygameBoard-div');
        const enemyBoardRow = enemyBoard.querySelectorAll('.x');

            if (player.turn) {

                PrintOutText.innerText = `It's your turn! Captain ${player.name}. ATTACK!`;
                enemyBoardRow.forEach((row) => {
                   const enCell = row.querySelectorAll('.y');
                   enCell.forEach((cell) => {
                        cell.addEventListener('click',(e) => {
                            e.preventDefault();
                            console.log(e.target.id);
                            const [row, col] = e.target.id.split('-').map(coord => parseInt(coord));
                            // player.attack(row,col)
                            enemyGameBoard.receiveAttack(row, col);

                            let boardForStyle = enemyGameBoard.displayBoard();
                            console.log(boardForStyle[row][col]);
                            if (boardForStyle[row][col] = {missedX:row,missedY:col} && !boardForStyle[row][col].hasOwnProperty('hits')) {
                                e.target.id = 'missed';
                                PrintOutText.innerText = `You missed!     at ${row} - ${col}`;
                                
                            }else if(boardForStyle[row][col] = Ship){
                                e.target.id = 'hitted';
                                PrintOutText.innerText =`HITTED !!!  at ${row} - ${col}`;
                                if(enemyGameBoard.allShipSunk()){
                                    let playerWon = true;
                                    this.gameOver(playerWon);
                                };
                            };
                            
                            player.switchTurn();
                            PC.switchTurn();
                            this.startTurn();
                        });
                    });
                });

         
              
            }else if (PC.turn) {

                let point1 = Math.floor(Math.random() * 10);//random number generetor
                let point2 = Math.floor(Math.random() * 10);
                // let att2 = PC.attack(point1, point2);

                playerGameBoard.receiveAttack(point1,point2);
                let boardForStyle2 = playerGameBoard.displayBoard();

                console.log(boardForStyle2[point1][point2]);

                let attckedPoint1 = 'x' + point1;//x0
                let attckedPoint2 = 'y' + point2;//y0
                console.log(attckedPoint1,attckedPoint2);//x0 y0

                if (boardForStyle2[point1][point2] = {missedX:point1,missedY:point2} && !boardForStyle2[point1][point2].hasOwnProperty('hits')) {
                    let rowMissedX = document.querySelector(`#${attckedPoint1}`);
                    let cellMissedY = rowMissedX.querySelector(`#${attckedPoint2}`);
                    cellMissedY.id = 'missed';
                    
                    

                }else if(boardForStyle2[point1][point2] = Ship){
                    let rowHittedX = document.querySelector(`#${attckedPoint1}`);
                    let cellHittedY = rowHittedX.querySelector(`#${attckedPoint2}`);
                    cellHittedY.id = 'hitted';
                    if(playerGameBoard.allShipSunk()){
                        let playerWon = false;
                        this.gameOver(playerWon);
                    };
                };    

                PC.switchTurn();
                player.switchTurn();
                console.log('PC ATTACKED',point1+'-'+point2);
                
            }else{
                throw new Error('something went wrong')
            
            }
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
                        PrintOutShipDiv.remove();
                        this.startTurn();
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
            rowDiv.id = rowIndex;
    
            row.forEach((cell, cellIndex) => {
            
            const cellDiv = document.createElement('div');
            cellDiv.className = "y";
            cellDiv.id =  rowDiv.id + '-' + cellIndex;
           
            // if (cell !== null) {
            //     cellDiv.classList.add("ship");
            // };
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

    this.gameOver = function(winnerIsPlayer) {

        


        if (winnerIsPlayer) {
            let gameOverPopUp = document.createElement('div');
            let winnerTextPopUp = document.createElement('p');
            gameOverPopUp.setAttribute('id','gameover-pop-up');
            winnerTextPopUp.setAttribute('id','winner-text-pop-up');
            gameOverPopUp.innerText = 'GAME OVER';
            winnerTextPopUp.innerText = 'YOU ARE THE WINNER!';
            gameOverPopUp.appendChild(winnerTextPopUp);
            PrintOutPlace.appendChild(gameOverPopUp);

        }else{
            let gameOverPopUp = document.createElement('div');
            gameOverPopUp.setAttribute('id','gameover-pop-up');
            gameOverPopUp.innerText = 'GAME OVER' + ' ' + 'YOU ARE THE LOSER!';
            PrintOutPlace.appendChild(gameOverPopUp);
        }
        
    };

};

export { GameLoop };
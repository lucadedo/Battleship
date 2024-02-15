import { Player } from './Player.js';
import { GameLoop } from './GameLoop.js';

const startButton = document.querySelector("#start-btn");
startButton.addEventListener('click',() =>{
    startButton.remove();
    //startButton.setAttribute("hidden",'true');
    const gameBoardSection = document.querySelector('#gameBoard-sec');
    
    const popUpdiv = document.createElement('div');
    const h1YourNameTxt = document.createElement('h1');
    const formName = document.createElement('form');
    const inputName = document.createElement('input');
    const letsgoButton = document.createElement('button');
    popUpdiv.setAttribute('id',"pop-up-name");
    h1YourNameTxt.setAttribute('id',"your-name-txt");
    formName.setAttribute('id','form-name');
    formName.setAttribute('action','#');
    inputName.setAttribute('id','input-name');
    inputName.setAttribute('type','text');
    inputName.setAttribute('placeholder','your name');
    letsgoButton.setAttribute('id','submit-name-btn');
    letsgoButton.setAttribute('type','submit');
    h1YourNameTxt.innerText ='Your name,Captain.';
    letsgoButton.innerText = `Let's go`;
    
    popUpdiv.appendChild(h1YourNameTxt);
    formName.appendChild(inputName);
    formName.appendChild(letsgoButton);
    popUpdiv.appendChild(formName);
    gameBoardSection.appendChild(popUpdiv);// append to gameBoard section

    formName.addEventListener('submit',(e) => {
        e.preventDefault();

        const newPlayer = new Player(inputName.value,true);// create Player
        const PC = new Player('captain PC', false); //create PC 
       
        popUpdiv.remove();
        const newGameLoop = new GameLoop(newPlayer,PC);
        newGameLoop.shipsDeploy();
       
        // gameBoardSection.style.gridTemplateRows = '8fr';
        // const PrintOutPlace = document.getElementById('start-up-bar');
        // const PrintOutText = document.createElement('p');
        // PrintOutText.setAttribute('id','print-out-text')
        // PrintOutText.innerText = `It's your turn! Captain ${newPlayer.name}.`;
        // PrintOutPlace.appendChild(PrintOutText);

    });
    
    
});











   


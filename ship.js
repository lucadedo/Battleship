const Ship = function(length,sunk,hits) {
   this.length = length;
   this.sunk = sunk;
   this.hits = hits;

   this.hit = function() {
    if (this.sunk === true) { // if ship already dead
        //console.log("ship already sunk");
        throw new Error('ship already sunk');
    }else{         // else add one hit and check if the ship isSunk()
        this.hits++;
        //console.log("Ship hit! Total hits: " + this.hits);
        this.isSunk();
        return `"Ship hit! Total hits: "${this.hits}`;
    };
   };

   this.isSunk = function() {
        if (this.hits >= this.length) { 
            //console.log("Ship Sunk! Total hits: " + this.hits);
            this.sunk = true;   
            return `'ship sunk Total hits: ' ${this.hits}`;// for testing
        }else{
            return "Ship still live!";       
        }; 
   };
};

const myShip  = new Ship(3, false ,0)
const myShip2  = new Ship(2, false ,0)
//console.log(myShip);
// myShip.hit()
// myShip.hit()
// myShip.hit()
myShip2.hit()
myShip2.hit()
myShip2.isSunk()







module.exports = Ship;
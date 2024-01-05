const GameBoard = require("./gameBoard");
//npm test .\gameBoard.test.js to test only this

const testgameBoard = new GameBoard();

test('CHOOSE SHIP', () => {
  expect(testgameBoard.chooseShip(0).length).toBe(5);
  expect(testgameBoard.chooseShip(0).sunk).toBeFalsy();
  expect(testgameBoard.chooseShip(0)).toMatchObject({
          length: 5,
          sunk: false,
          hits: 0,
          hit: expect.any(Function),
          isSunk: expect.any(Function)
        }
      );
});

test('PLACE SHIP', () => {
  testgameBoard.placeShip(0,0)
  testgameBoard.changeShipDirection();
  testgameBoard.placeShip(3,4)
  let testBoard = testgameBoard.displayBoard()
  expect(testBoard[0][0]).not.toBeNull();
  expect(testBoard[0][0]).toMatchObject({
        length: 5,
        sunk: false,
        hits: 0,
        hit: expect.any(Function),
        isSunk: expect.any(Function)
      }
    );
  expect(testgameBoard.placeShip(1,0)).toBeFalsy();
  expect(testgameBoard.placeShip(3,5)).toBeFalsy();
  expect(() => testgameBoard.placeShip(10,10)).toThrow('cant place here ');
});

test('RECIEVE ATTACK', () => {
  let testBoard2 = testgameBoard.displayBoard()
  testgameBoard.placeShip(0,0)
  testgameBoard.receiveAttack(0,0)

  expect(testBoard2[0][0]).not.toBeNull();
  expect(testgameBoard.chooseShip(0).hits).toBe(1);
  testgameBoard.receiveAttack(1,0);
  expect(testgameBoard.chooseShip(0).hits).toBe(2);
  testgameBoard.receiveAttack(2,0);
  expect(testgameBoard.chooseShip(0).hits).toBe(3);// hits = 3
  testgameBoard.receiveAttack(3,0);
  testgameBoard.receiveAttack(4,0);
  expect(testgameBoard.chooseShip(0).hits).toBe(5);// hits = 3
  expect(testgameBoard.chooseShip(0).sunk).toBeTruthy();
  testgameBoard.receiveAttack(6,5);
  expect(testgameBoard.displayBoard()[6][5]).toEqual({missedX:6,missedY:5});// missed hits
});

test('ALL SHIP SUNK', () => {
  const testBoard2 = new GameBoard();
  testBoard2.chooseShip(4);
  testBoard2.placeShip(0,0);
  expect(testBoard2.displayBoard()[0][0]).not.toBeNull();
  testBoard2.receiveAttack(0,0);
  testBoard2.receiveAttack(1,4);
  testBoard2.receiveAttack(1,0);
  expect(testBoard2.displayBoard()[0][0].sunk).toBeTruthy();
})

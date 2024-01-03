const Ship = require("./ship");

const testShip  = new Ship(3, false ,0);
const testShip2  = new Ship(2, false ,0);


test('SHIP PROP CHECK', () => {   
    expect(testShip.length).toEqual(3);
    expect(testShip.sunk).toBeFalsy();
    expect(testShip.hits).toEqual(0)
});

test('SHIP HIT TEST', () => {
    testShip.hit();
    expect(testShip.hits).toEqual(1);
    testShip.hit();
    testShip.hit();
    expect(testShip.hits).toEqual(3);
    expect(() => testShip.hit()).toThrow('ship already sunk');
});

test('TEST SHIP SUNK', () => {   
    testShip2.hit();
    testShip2.hit();
    expect(testShip2.isSunk()).toMatch(/ship sunk/);
    expect(testShip2.sunk).toBeTruthy();
});
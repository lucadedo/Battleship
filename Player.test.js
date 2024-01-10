const Player = require("./Player");

const testPlayer = new Player('Captain',true);

test('TEST PLAYER OBJ',() => {
    expect(testPlayer).toMatchObject({
        name: 'Captain',
        turn: true,
      });
    testPlayer.switchTurn();
    expect(testPlayer.turn).not.toBeTruthy()
});
test('PLAYER ATTACK',() => {
    expect(testPlayer.attack(1,2)).toStrictEqual([1, 2]);
})


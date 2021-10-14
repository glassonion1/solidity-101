const GreeterContract = artifacts.require('Greeter');

contract('Greeter', () => {
  let instance;
  before(async () => {
      instance = await GreeterContract.deployed();
  });
  it('should get message correctly', async () => {
    const expected = 'Hello World!';
    const actual = await instance.greet();
    assert.equal(actual, expected, 'greeted with Hello World!');
  });
  it('should update message correctly', async () => {
    const expected = 'Hi there!';
    await instance.setMessage(expected);
    const actual = await instance.greet();
    assert.equal(actual, expected, 'greeting was not updated');
  });
});

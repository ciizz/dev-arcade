/**
 * Truffle uses the Mocha testing framework and Chai for assertions to provide you 
 * with a solid framework from which to write your JavaScript tests.
 * 
 * !!!!A web3 instance is available in each test file, configured to the correct provider!!!!
 * So calling web3.eth.getBalance just works!
 */

var Arcade = artifacts.require("./Arcade.sol"); 
var DiceRoll = artifacts.require("./DiceRoll.sol"); 


 /**
  * The contract function is like the describe functon in mocha but abstract two things for us:
  * Before each contract() function is run, your contracts are redeployed to the running Ethereum client so the tests within it run with a clean contract state.
    The contract() function provides a list of accounts made available by your Ethereum client which you can use to write tests.
    
    When using ganache, accounts[0] will be the account used for contract deployment by default. 
  */
 contract('Arcade', function(accounts) { // contract gives us a callback function with the list of accounts 
    
  let ArcadeInstance; 
  let DiceRollInstance;
  let createReceipt; 
    it('Create a game room', async () => {
        ArcadeInstance = await Arcade.deployed(); 

        createReceipt = await ArcadeInstance.loadGameRoom({from: accounts[0]}); 

        const contractAddress =  await ArcadeInstance.gameRooms(accounts[0]); 

        DiceRollInstance = await new web3.eth.Contract(DiceRoll.abi, contractAddress); 

        assert.equal(DiceRollInstance.options.address, contractAddress); 
    }); 
    it('A game room is initialized with the correct values', async () => {
      const wins = await DiceRollInstance.methods.wins().call(); 
      assert.equal(wins,0, "the number of wins is 0"); 
      const score = await DiceRollInstance.methods.score().call(); 
      assert.equal(score, 0, "the score is 0"); 
  }); 
    it('Create event is emitted', async() => {
      assert(createReceipt.logs[0].event, "Create", "The triggered event should be the create event"); 
      assert(createReceipt.logs[0].args._player, accounts[0], "The room is initialized to the correct player"); 
      assert(createReceipt.logs[0].args._success, true, "The room creation was successful"); 
     
    }); 
    it("Load event is emitted with correct values", async () => {
      
      const loadReceipt = await ArcadeInstance.loadGameRoom(); 

      assert(loadReceipt.logs[0].event, "Create", "The triggered event should be the create event"); 
      assert(loadReceipt.logs[0].args._player, accounts[0], "The room is initialized to the correct player"); 
      assert(loadReceipt.logs[0].args._roomAddress, accounts[0], "The address of the gameRoom is returned"); 
      assert(loadReceipt.logs[0].args._score, 0, "the score is 0"); 
      assert(loadReceipt.logs[0].args._wins, 0, "the number of wins is 0");
    });   
    it("Cannot create two game rooms for the same player", async () => {
      let errorMessage; 
      try {
        await ArcadeInstance.createGameRoom(accounts[0]); 
      } catch(e){
        errorMessage = e.message; 
        assert(errorMessage, "A game room for this user already exists")
      } 
    }); 
 }); 
 
   
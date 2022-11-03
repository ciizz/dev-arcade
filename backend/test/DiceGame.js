/**
 * Truffle uses the Mocha testing framework and Chai for assertions to provide you 
 * with a solid framework from which to write your JavaScript tests.
 * 
 * !!!!A web3 instance is available in each test file, configured to the correct provider!!!!
 * So calling web3.eth.getBalance just works!
 */


 var DiceRoll = artifacts.require("./DiceRoll.sol"); // artifacts.require() abstract the compilation 
 var Arcade = artifacts.require("./Arcade.sol"); 
 var BAMToken = artifacts.require("./token/BAMToken.sol");

 console.log(process.env.GANACHE_PORT);

 /**
  * The contract function is like the describe functon in mocha but abstract two things for us:
  * Before each contract() function is run, your contracts are redeployed to the running Ethereum client so the tests within it run with a clean contract state.
    The contract() function provides a list of accounts made available by your Ethereum client which you can use to write tests.
  */
 contract('DiceRoll', function(accounts) { // contract gives us a callback function with the list of accounts 

    let ArcadeInstance; 
    let DiceRollInstance; 
    let BAMTokenInstance;
    let admin;

    let betAmount = 10; 
    let pick = 5; 
    let gasLimit = '1500000'

     describe("Dice game unit tests", async () => {

      it('Create a game room', async () => {
        ArcadeInstance = await Arcade.deployed(); 
        admin = await ArcadeInstance.admin();
        console.log(admin);

        createReceipt = await ArcadeInstance.loadGameRoom({from: accounts[1]});  

        const contractAddress =  await ArcadeInstance.gameRooms(accounts[1]); 
        DiceRollInstance = await new web3.eth.Contract(DiceRoll.abi, contractAddress); 
        assert.equal(DiceRollInstance.options.address, contractAddress); 

        const tokenAddress =  await DiceRollInstance.methods.BAM().call();
        BAMTokenInstance = await new web3.eth.Contract(BAMToken.abi, tokenAddress);
        assert.equal(BAMTokenInstance.options.address, tokenAddress);
      }); 
      
      it("Bet is placed correctly", async () => { //TODO: need to check that the balance of the player after the bet is correctly updated (win or lose)
        // fund account with BAM tokens
        await BAMTokenInstance.methods.transferFrom(ArcadeInstance.address, accounts[1], 100).send({from: admin});
        const BAMBalance = await BAMTokenInstance.methods.balanceOf(accounts[1]).call()
        assert.equal(BAMBalance, 100);

        const approveResult = await BAMTokenInstance.methods.approve(DiceRollInstance.options.address, BAMBalance).send({from: accounts[1]});
        assert.equal(approveResult.status, true, "The transaction was successful");

        const receipt = await DiceRollInstance.methods.bet(betAmount, pick).send({from: accounts[1], gas: gasLimit}); 
        
        setTimeout(function(){ /* because javaScript is such an amazing language, it actually does not load the JSON right away 
          in some cases (randomly) which causes everything you acces to be undefined because it is not here yet */
          var eventValues =JSON.parse(JSON.stringify(receipt.events.Bet.returnValues));

          assert(receipt.events.Bet.event, "Bet", "the bet event is emitted"); 
          assert.equal(eventValues['0'], accounts[1],  "the owner of the gameRoom placed the bet"); 
          assert.equal(eventValues['1'], toString(pick),  "the picked value is correct");
          assert(eventValues['2'], "an outcome was generated"); 
          assert.equal(eventValues['3'], toString(betAmount), "the betAmount is correct"); 
          assert(eventValues['4'], "the updated number of wins was returned");
          assert(eventValues['5'], "the updated score was returned");
      }, 1000);
      }); 

      it("Only the owner of the gameRoom can place a bet", async () => {
        try {
          await DiceRollInstance.methods.bet(betAmount, pick).send({from: accounts[2], gas: gasLimit}); 
        } catch(e) {
          assert(e.message, "only the player can call this function");
        }
      }); 

      it("An out of bounds pick is not accepted", async () => {
        try {
          await DiceRollInstance.methods.bet(betAmount, 12).send({from: accounts[1], gas: gasLimit}); 
        } catch(e) {
          assert(e.message, "picked number is invalid");
        }
      });

      it("The outcome generated is within bounds", async () => {
        const receipt = await DiceRollInstance.methods.bet(betAmount, pick).send({from: accounts[1], gas: gasLimit}); 

        const outcome = parseInt(receipt.events.Bet.returnValues['2']); 
        const withinBounds = outcome <= 6 && outcome > 0 ? true : false; 

        assert(withinBounds, "the outcome is within bounds"); 
      }); 

      it("The number of win is updated after a bet", async () => {
        let winsBeforeBet = await DiceRollInstance.methods.wins().call();
        winsBeforeBet = parseInt(winsBeforeBet); 

        const receipt = await DiceRollInstance.methods.bet(betAmount, pick).send({from: accounts[1], gas: gasLimit}); 

        const outcome = parseInt(receipt.events.Bet.returnValues['2']); 
        const withinBounds = outcome <= 6 && outcome > 0 ? true : false; 
        assert(withinBounds, "the outcome is within bounds"); 

        const updatedWins = parseInt(receipt.events.Bet.returnValues['5']); 
        if(outcome !== pick) {
          assert.equal(updatedWins, winsBeforeBet, "the number of wins remains the same"); 
        } else {
          assert.equal(updatedWins, (winsBeforeBet+1), "the number of wins is increased by one"); 
        }
      }); 

      it("The score is updated after a bet", async () => {
        let scoreBeforeBet = await DiceRollInstance.methods.score().call();
        scoreBeforeBet = parseInt(scoreBeforeBet); 

        const receipt = await DiceRollInstance.methods.bet(betAmount, pick).send({from: accounts[1], gas: gasLimit}); 

        const outcome = parseInt(receipt.events.Bet.returnValues['2']); 
        const withinBounds = outcome <= 6 && outcome > 0 ? true : false; 
        assert(withinBounds, "the outcome is within bounds"); 

        const updatedScore = parseInt(receipt.events.Bet.returnValues['4']); 
        if(outcome !== pick) {
          assert.equal(updatedScore, (scoreBeforeBet-betAmount), "the score is decreased by the bet amount"); 
        } else {
          assert.equal(updatedScore, (scoreBeforeBet+betAmount), "the score is increased by the bet amount"); 
        }
      });
      
      it("A player cannot bet less than the minimum bet or more than the maximum bet", async () => {
        try {
          await DiceRollInstance.methods.bet(0, pick).send({from: accounts[1], gas: gasLimit}); 
        } catch(e) {
          assert(e.message, "Minimum bet is 1 BAM");
        }

        try {
          await DiceRollInstance.methods.bet(101, pick).send({from: accounts[1], gas: gasLimit}); 
        } catch(e) {
          assert(e.message, "Maximum bet is 15 BAM");
        }
      }); 

     }); 
 }); 
 
   
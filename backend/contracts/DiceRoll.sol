// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Arcade.sol";
import "./token/BAMToken.sol";

// add import of the tokenContract
interface Game {
   // keep it here to remember to make an interface of the diceRoll methods
}

/* this contract will be created each time the player starts a new "game room" */
contract DiceRoll {

    // will take up 4 storage slots 
    address public player; 
    address private arcade; 
    int256 public score; 
    uint256 public wins; 
    BAMToken public BAM;

    constructor(address _player, address _arcade, address _tokenAddress) {
        player = _player; 
        arcade = _arcade; 
        score = 0; 
        wins = 0; 
        BAM = BAMToken(_tokenAddress);
    }

    modifier playerOnly {
         require(msg.sender == player, "only the player can call this function"); 
         _; 
    }
   
    modifier correctPick(uint256 _pick) {
        require(_pick >= 1 && _pick <= 6, "picked number is invalid"); 
        _; 
    } 
    modifier betAmountInRange(uint256 _betAmount) {
        require(_betAmount >= 1, "Minimum bet is 1 BAM");
        require(_betAmount <= 15, "Maximum bet is 15 BAM");
        _; 
    } 

    event Bet(
        address _player,
        uint256 _pick, 
        uint256 _outcome,
        uint256 _betAmount, 
        int256 _updatedScore,
        uint256 _updatedWins
        ); 

    /*  this is a pseudorandom generator, its randomness is deterministic, eventually we will want to explore options that provide true randomness */
    function rollDice() private view returns (uint256) {
         uint256 seed = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, player)));
         return seed % 6 + 1; // 2 for testing purposes - replace with 6 later on
    } 

    function bet(uint256 _betAmount, uint256 _pick) public playerOnly correctPick(_pick) betAmountInRange(_betAmount) returns (bool _success){ 
        uint256 arcadeBalance = BAM.balanceOf(address(arcade));
        require(_betAmount <= arcadeBalance, "Sorry, not enough tokens in the reserve");
        // player pays upfront
        // need to approve allowance beforehand directly from BAM token contract
        BAM.transferFrom(msg.sender, arcade, _betAmount);

        uint256 _outcome = rollDice();
        if(_pick == _outcome) { // player won
            Arcade devArcade = Arcade(arcade); // loading arcade contract to call function
            devArcade.distributeWins(_betAmount, msg.sender);
            //update wins and score
            wins = wins + 1; 
            score += int256(_betAmount);
        } else {
            // update score
            score -= int256(_betAmount); 
        }
        
        emit Bet(player, _pick, _outcome, _betAmount , score, wins); 

        return true; 
    }

}
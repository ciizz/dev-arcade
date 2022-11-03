// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DiceRoll.sol"; 
import "./token/BAMToken.sol";

contract Arcade {

    // will take up 4 storage slots
    BAMToken public BAM; 
    mapping(address => address) public gameRooms;  
    address public admin; 
    address[] public players;
    uint256 public totalSupply = 1000000000;

    constructor() {
        admin = msg.sender; 
        BAM = new BAMToken(totalSupply); // deploying BAMToken and getting all the supply in the Arcade contract
        BAM.approve(admin, totalSupply); // ATTENTION: this does not imply admin has infinite control - but just enough allowance for totalSupply
    }

    modifier adminOnly {
        require(msg.sender  == admin); 
        _; 
    }

    modifier doesNotExist(address _player) {
        require(gameRooms[_player] == address(0), "A game room for this user already exists"); 
        _; 
    }

    modifier doesExist(address _player) {
        require(gameRooms[_player] != address(0), "A game room for this user does not exist"); 
        _; 
    }

    event Create(
        address _player, 
        bool _success
    ); 

    event Load(
        address _player,
        address _roomAddress,
        int256 _score, 
        uint256 _wins
    );

    event Payout(
        address _player,
        uint256 _winnings
    );

    // create a game room specific to a given player
    function createGameRoom() public doesNotExist(msg.sender) {
        DiceRoll gameRoom = new DiceRoll(msg.sender, address(this), address(BAM)); 
        gameRooms[msg.sender] = address(gameRoom);
        players.push(msg.sender); 

        emit Create(msg.sender, true);
    }

    // load a game room specific to a given player
    function loadGameRoom() public doesExist(msg.sender) {
        DiceRoll diceRollObject = DiceRoll(gameRooms[msg.sender]); 

        emit Load(diceRollObject.player(), gameRooms[msg.sender], diceRollObject.score(), diceRollObject.wins()); 
    }

    function distributeWins(uint256 _betAmount, address _player) public {
        // require that the caller be a diceroll contract to avoid fraud
        // TODO : check if we can make SURE that the caller is a DiceRoll contract, and not just any contract (safer this way) --> tx.origin here is the diceroll contract and the msg.sender is the arcade contract, so what you can do is check if tx.origin == gamerooms(player) => I guess that's what you are trying to do
        require(msg.sender != tx.origin, "Only DiceRoll contracts can call this function"); 
        BAM.transfer(_player, _betAmount * 6);

        emit Payout(_player, _betAmount);
    }
    
    function getPlayerScore(address _player) public view returns (int256 _score) {
        DiceRoll _gameRoom = DiceRoll(gameRooms[_player]); 

        return _gameRoom.score(); 
    }
    
    function getPlayerWins(address _player) public view returns (uint256 _wins) {
        DiceRoll _gameRoom = DiceRoll(gameRooms[_player]); 

        return _gameRoom.wins(); 
    }

    function getNumberOfPlayers() public view returns (uint256 _playersNumber) {
        return players.length; 
    } 
    
}
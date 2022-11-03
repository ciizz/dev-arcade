import {web3} from './web3'
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "_success",
        "type": "bool"
      }
    ],
    "name": "Create",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_roomAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "_score",
        "type": "int256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_wins",
        "type": "uint256"
      }
    ],
    "name": "Load",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_winnings",
        "type": "uint256"
      }
    ],
    "name": "Payout",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "BAM",
    "outputs": [
      {
        "internalType": "contract BAMToken",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "gameRooms",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "players",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createGameRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "loadGameRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_betAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_player",
        "type": "address"
      }
    ],
    "name": "distributeWins",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_player",
        "type": "address"
      }
    ],
    "name": "getPlayerScore",
    "outputs": [
      {
        "internalType": "int256",
        "name": "_score",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_player",
        "type": "address"
      }
    ],
    "name": "getPlayerWins",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_wins",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNumberOfPlayers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_playersNumber",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]; 
const arcade = new web3.eth.Contract(abi,"0x46A169A212f12d75bA9B2277189Dc91e08a68368") // get the deployed instance of the contract

export default arcade;
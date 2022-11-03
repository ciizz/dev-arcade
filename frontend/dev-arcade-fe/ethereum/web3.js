import Web3 from 'web3'; 

let web3; 
function handleAccountsChanged(accounts) {
   let currentAccount = null;
   if (accounts.length === 0) {
     // MetaMask is locked or the user has not connected any accounts
     console.log('Please connect to MetaMask.');
     return null; 
   } else if (accounts[0] !== currentAccount) {
     //currentAccount = accounts[0];
     // Do any other work!
     currentAccount = accounts[0]

      return currentAccount
   }
 }
async function getUserAccount() {
   let accounts = null; 
   try {
      accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      let currentAccount = handleAccountsChanged(accounts)
      return currentAccount;
   }
   catch(err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    };;
}
// first try to connect through metamask provider and check if we are in the browser
if( typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
   web3 = new Web3(window.ethereum); // use the metamask provider
} else { // fall back to infura if we are on the server or if the user doesn't have metamask
   const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/bff9edfa620d4cd38a2412d90a516061");
   web3 = new Web3(provider); 
}
export {getUserAccount, web3}; 
import Web3 from 'web3';

var web3;

async function connectToMetamask() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            return true;
        } catch (error) {
            return false;
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        return true;
    } else {
        return false;
    }
}
// Check if Metamask is installed and the user is using an Ethereum-enabled browser
if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
  // Web3 browser user detected. You can now use the provider.
  const provider = window['ethereum'] || window.web3.currentProvider;
  window.web3 = new Web3(provider);
  window.ethereum.enable().then(function(accounts){
    console.log(accounts[0]);
  });
} else {
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

// Define the smart contract address and ABI
const contractAddress = '0x123...';
const contractAbi = [{...}];

// Create an instance of the contract
const contract = new window.web3.eth.Contract(contractAbi, contractAddress);

// Function to freeze the tokens
async function freezeTokens() {
  try {
    const accounts = await window.ethereum.enable();
    const result = await contract.methods.freeze().send({ from: accounts[0] });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Function to unfreeze the tokens
async function unfreezeTokens() {
  try {
    const accounts = await window.ethereum.enable();
    const result = await contract.methods.unfreeze().send({ from: accounts[0] });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Function to withdraw tokens
async function withdrawTokens() {
  try {
    const accounts = await window.ethereum.enable();
    const result = await contract.methods.withdraw().send({ from: accounts[0] });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Function to approve an address to spend tokens
async function approveAddress(address) {
  try {
    const accounts = await window.ethereum.enable();
    const result = await contract.methods.approve(address, '1000000000000000000').send({ from: accounts[0] });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Function to get the token balance of an address
async function getTokenBalance(address) {
  try {
    const result = await contract.methods.balanceOf(address).call();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Function to get the token balance of burned tokens
async function getBurnedTokenBalance() {
  try {
    const result = await contract.methods.balanceOfBurned().call();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

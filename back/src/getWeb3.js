const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider(process.env.SOLIDITY_ADDRESS);
const web3 = new Web3(provider);

module.exports = web3;
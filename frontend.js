const Web3 = require('web3');
const settings = require('./abi');

const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"

const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"

const web3 = new Web3("http://localhost:8545")
const contract = new web3.eth.Contract(settings, "0x856e88024854a825b8Bd18D49A16212c43983eFA")

var ss = contract.methods.changeGreeting("ssss");

var ss = contract.methods.greet().call();
console.log(ss);

// function test()
// {
    
// }

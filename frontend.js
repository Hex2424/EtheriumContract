// const Web3 = require("web3");
// const settings = require("./abi");

// const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"

// const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"



// const web3 = new Web3("http://localhost:8545")
// const contract = new web3.eth.Contract(settings, "0x856e88024854a825b8Bd18D49A16212c43983eFA")

//  // Get a reference to the button
// btn = document.getElementById('mygtukas');

//  // Add an event listener to the button
//  btn.addEventListener('click', function() {
//     // Call the contract function when the button is clicked
//     var ss = contract.methods.greet().call();
//     console.log(ss);
//  });
const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "changeGreeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

// var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Create an instance of the contract


// Call a function of the contract
var contract
var fromAddress;




async function test()
{
    response = await contract.methods.changeGreeting("bh hb").send(
        {
            from: fromAddress,
            gas: "21000"
          }
    );
    alert(response);
}


async function greet() {
    string = await contract.methods.greet().call();
    alert(string);
}

async function connect()
{
    if (typeof window.ethereum === "undefined") {
        return setError("Metamask not installed");
    }

  
    await window.ethereum.request({method: "eth_requestAccounts"});
    var w3 = new Web3(window.ethereum);
    contract = new w3.eth.Contract(abi, "0x951e72827cADe94Cfa856ABB01b0fC17886f60A0");

    w3.eth.getAccounts((error, accounts) => {
        if (error) {
          // Handle error
        } else {
          // The user's Ethereum addresses are stored in the accounts array
          // You can use the first address in the array as the from parameter
          // when calling a contract function
            fromAddress = accounts[0];
        }
    });
}

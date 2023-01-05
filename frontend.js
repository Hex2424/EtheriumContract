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
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Message",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "player1",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "player2",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "playerGrid",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "playerState",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "shotsTaken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newPlayer1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newPlayer2",
        "type": "address"
      }
    ],
    "name": "setPlayers",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint8[10][10]",
        "name": "newGrid",
        "type": "uint8[10][10]"
      }
    ],
    "name": "setGrid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "y",
        "type": "uint256"
      }
    ],
    "name": "takeShot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Create an instance of the contract


// Call a function of the contract
var contract
var fromAddress;
var toAddress;


async function test()
{
    console.log(fromAddress);
    response = await contract.methods.changeGreeting("bh hb").send(
        {
            from: fromAddress,
            gas: "21000"
          }
    );
    console.log(response);
}


async function greet() {
    string = await contract.methods.greet().call();
    alert(string);
}

async function connect()
{
    if (typeof window.ethereum === "undefined") {
        alert("ERROR: Metamask is not installed, please install it firstly in browser")
        return;
    }

    await window.ethereum.request({method: "eth_requestAccounts"});
    var w3 = new Web3(window.ethereum);
    contract = new w3.eth.Contract(abi, "0x48f484714d40B1c23472B6cBfa1C323E73f3fEb6");

    w3.eth.getAccounts((error, accounts) => {
        if (error) {
          // Handle error
        } else {
          // The user's Ethereum addresses are stored in the accounts array
          // You can use the first address in the array as the from parameter
          // when calling a contract function
            setupAddresses(accounts);
        }
    });

}


async function connectToGame(){
  if(fromAddress == undefined)
  {
    alert("Your address not selected");
    return;
  }

  if(toAddress == undefined)
  {
    alert("Your enemy address not selected");
    return;
  }


  await contract.methods.setPlayers(fromAddress, toAddress).send(
    {
        from: fromAddress,
        gas: "21000"
    }).then(function(result) 
    {
      console.log(result);
      
    }).catch(function(error) 
    {
      console.log(error.message);
      
    });
}


function setupAddresses(addreses)
{
    var selector_your = document.getElementById("selector_your");
    var selector_enemy = document.getElementById("selector_enemy");

    selector_your.addEventListener("change", function() {
      fromAddress = addreses[this.selectedIndex];
    });

    if(selector_enemy.value == '')
    {
      alert("Write enemy address");
      return;
    }
    
    selector_your.innerHTML = '';
    selector_enemy.innerHTML = '';
    console.log(addreses)

    // Loop through the options and add them to the select element
    for (var i = 0; i < addreses.length; i++) {
      var option = document.createElement("option");
      option.value = "Account" + (i + 1) + "("+ addreses[i] + ")";
      option.text = "Account" + (i + 1) + "("+ addreses[i] + ")";
      selector_your.add(option);
    }


    toAddress = selector_enemy.value;
    fromAddress = addreses[0];

}


function generateMap() {
  clearMap();
  coords = generateShips();
  coords.forEach(shipPart => {
    getShipChecker(shipPart.x, shipPart.y).checked = true;
  });
}

async function setMapOfContract()
{
  const array = Array.from({length: 10}, () => new Array(10));

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {

      array[x][y] = getShipChecker(x, y).checked;

    }
  }

  await contract.methods.setGrid(array).send(
  {
      from: fromAddress,
      gas: "21000"
  }).then(function(result) 
  {
    console.log(result);
    
  }).catch(function(error) 
  {
    console.log(error.message);

  });

}



function getShipChecker(x, y)
{
  var id = "field-x" + (Number(x) + 1) + "-y" + (Number(y) + 1);
  field = document.getElementsByClassName(id);
  shipField = field[1];
  
  return shipField.querySelector('.ship.check');
}


function clearMap(){
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      getShipChecker(x, y).checked = false;
    }
  }
}


function generateShips() {
  // Array to store the ship locations
  const ships = [];

  // List of ship sizes (in number of cells)
  const sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  // Generate ship locations
  for (const size of sizes) {
    let x, y;
    let orientation;

    // Generate random position and orientation for the ship
    // Keep generating until the ship does not overlap with any existing ships
    // and fits within the grid
    do {
      orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

      if (orientation === 'horizontal') {
        x = Math.floor(Math.random() * (10 - size));
        y = Math.floor(Math.random() * 10);
      } else {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * (10 - size));
      }
    } while (x < 0 || y < 0 || x + size > 10 || y + size > 10 || shipOverlaps(size, x, y, orientation, ships));

    // Add the ship cells to the ships array
    for (let i = 0; i < size; i++) {
      if (orientation === 'horizontal') {
        ships.push({x: x + i, y});
      } else {
        ships.push({x, y: y + i});
      }
    }
  }

  return ships;
}

function shipOverlaps(size, x, y, orientation, ships) {
  // Check if the ship overlaps with any of the existing ships
  for (const cell of ships) {
    if (orientation === 'horizontal') {
      if (Math.abs(cell.y - y) <= 1 && cell.x >= x - 1 && cell.x < x + size + 1) {
        return true;
      }
    } else {
      if (Math.abs(cell.x - x) <= 1 && cell.y >= y - 1 && cell.y < y + size + 1) {
        return true;
      }
    }
  }

  return false;
}
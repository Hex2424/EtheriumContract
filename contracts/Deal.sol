pragma solidity >=0.5.0 <0.9.0;


contract Deal {
    // Mapping from player address to player state (0 = inactive, 1 = ready, 2 = playing)
    mapping(address => uint8) public playerState;

    // Mapping from player address to player grid (0 = empty, 1 = ship, 2 = hit)
    mapping(address => uint8[10][10]) public playerGrid;

    // Mapping from player address to shots taken
    mapping(address => uint) public shotsTaken;


    address public player1;
    address public player2;

    // Event for sending a message to the other player
    event Message(string message);


   function setPlayers(address newPlayer1, address newPlayer2) public payable {
        require(newPlayer1 != address(0) && newPlayer2 != address(0), "Invalid player addresses");
        require(newPlayer1 != newPlayer2, "Player addresses must be different");
        require((player1 == address(0) || player1 == msg.sender) && (player2 == address(0) || player2 == msg.sender), "Sender is already a player");
        require(msg.value == 1 ether && (newPlayer1.balance >= 1 ether) && (newPlayer2.balance >= 1 ether), "Players must have a balance of at least 1 Ether");

        if (player1 == address(0)) {
            player1 = newPlayer1;
            player2 = newPlayer2;
        } else {
            player1 = newPlayer2;
            player2 = newPlayer1;
        }
        playerState[player1] = 1;
        playerState[player2] = 1;
    }

  
    function setGrid(uint8[10][10] memory newGrid) public {
        require(playerState[msg.sender] == 1, "Player is not ready");
        playerGrid[msg.sender] = newGrid;
        playerState[msg.sender] = 2;
        emit Message("Player is ready");
    }


    function takeShot(uint x, uint y) public {
        require(playerState[msg.sender] == 2, "Player is not playing");
        require(x >= 0 && x < 10 && y >= 0 && y < 10, "Invalid coordinates");
        require(playerGrid[otherPlayer()][x][y] != 2, "Location already hit");

        playerGrid[otherPlayer()][x][y] = 2;
        shotsTaken[msg.sender]++;
        emit Message("Shot taken");

        if (checkWin()) {
            emit Message("Player wins");
            playerState[msg.sender] = 0;
            playerState[otherPlayer()] = 0;
        }
    }

    function checkWin() private view returns (bool) {
        uint8[10][10] memory grid = playerGrid[otherPlayer()];
        for (uint i = 0; i < 10; i++) {
            for (uint j = 0; j < 10; j++) {
                if (grid[i][j] == 1) {
                    return false;
                }
            }
        }
        return true;
    }

    // Helper function for getting the other player's address
    function otherPlayer() private view returns (address) {
        return (msg.sender == player1) ? player2 : player1;
    }
}
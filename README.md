# Battleship smart contract

A custom smart startup contract implementation for Vilnius University "Blockchain technologies" course.

## Usage

In order to run this smart contract in development mode, the following commands must be executed in parallel.


Run etherium blockchain
```bash
ganache-cli
```

Deploy smart contract
```bash
truffle deploy
```

## Smart contract sequence from frontend perspective

*   1. Connecting metamask account
*   2. Selecting/writing down player addreses
*   3. Setting players
*   4. Genereting map/ setting it to contract
*   5. taking shots after each other turn

## Smart contract description

Main contract idea was to create decentralized Battleships game, where both players puts their etherium and which one wins, gets all the money, each move costs.
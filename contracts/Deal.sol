// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Deal {
    /* define variable greeting of the type string */
    string greeting;
 
    /* this runs when the contract is executed */
    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    /* change greeting */
    function changeGreeting(string memory _greeting) public returns (string memory){
        greeting = _greeting;
        return greeting;
    }

    /* main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}

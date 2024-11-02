// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract BIT_KCA {
    uint256 number;
    string public message;

    constructor(uint256 startingPoint, string memory startingMessage) {
        number = startingPoint;
        message = startingMessage;
    }

    function getNumber() external view returns(uint256) {
        return number;
    }

    function increasingNumber() external  {
        number++;
    }

    function decreasingNumber() external  {
        number--;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
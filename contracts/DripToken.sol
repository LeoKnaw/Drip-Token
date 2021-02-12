pragma solidity ^0.6.1;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DripToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Drip", "DRIP") {
        _mint(msg.sender, initialSupply);
        _setupDecimals(0);
    }

}

pragma solidity ^0.6.2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DripKYC is Ownable{
  mapping(address => bool) allowed;

  function setKYCComplete(address _addr) public onlyOwner{
    allowed[_addr] = true;
  }

  function setKYCRevoked(address _addr) public onlyOwner{
    allowed[_addr] = false;
  }

  function KYCComplete(address _addr) public view returns(bool){
    return allowed[_addr];
  }
}

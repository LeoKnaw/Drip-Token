var DripToken = artifacts.require("./DripToken.sol");
var DripSale = artifacts.require("./DripSale.sol");
var KYCContract = artifacts.require("./DripKYC.sol");
require("dotenv").config({path: "../.env"})


module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(DripToken, process.env.INTIAL_TOKENS);
  await deployer.deploy(KYCContract);
  await deployer.deploy(DripSale, 1, addr[0], DripToken.address, KYCContract.address);
  let instance  = await DripToken.deployed();
  await instance.transfer(DripSale.address, process.env.INTIAL_TOKENS);
};

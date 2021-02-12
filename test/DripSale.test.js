const Sale = artifacts.require("./DripSale.sol");
const Token = artifacts.require("./DripToken.sol");
const kyc = artifacts.require("./DripKYC.sol");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;


require("dotenv").config({path: "../.env"})


contract("TokenSale test", async (accounts) => {
  const [deployerAddress, receiver] = accounts;

  it("should be no more tokens in the original address", async() => {

    let instance = await Token.deployed();
    return expect(instance.balanceOf(deployerAddress)).to.eventually.be.a.bignumber.equal(new BN(0));

  })

  it("should have all the tokens in the smart contract address", async () => {

    let token = await Token.deployed();
    let sale = await Sale.deployed();
    let totalSupply = await token.totalSupply();

    return expect(token.balanceOf(Sale.address)).to.eventually.be.a.bignumber.equal(totalSupply);

  })

  it("should be able to sell tokens", async () =>{
    let token = await Token.deployed();
    let sale = await Sale.deployed();
    let kycInstance = await kyc.deployed();

    await kycInstance.setKYCCOmplete(deployerAddress, {from:deployerAddress});
    let balanceBefore = await token.balanceOf(deployerAddress);
    let totalSupply = await token.totalSupply()
    //console.log(balanceBefore)
    expect(sale.sendTransaction({from:deployerAddress, value:web3.utils.toWei("1", "wei")})).to.be.fulfilled;
    return expect(token.balanceOf(deployerAddress)).to.eventually.be.a.bignumber.equal(balanceBefore + new BN(1));

  })

});

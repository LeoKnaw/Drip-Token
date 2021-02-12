const Token = artifacts.require("./DripToken.sol");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;
require("dotenv").config({path: "../.env"})


contract("Token test", async (accounts) => {
  const [deployerAddress, receiver] = accounts;

  beforeEach(async() =>  {
    this.token = Token.new(process.env.INTIAL_TOKENS);
  })

  it("should have all the tokens in the first account", async () => {
    let instance = await this.token
    let totalSupply = await instance.totalSupply();
    return expect(instance.balanceOf(deployerAddress)).to.eventually.be.a.bignumber.equal(totalSupply);
  })

  it("should be able to send tokens", async () =>{
    const sentTokens = 1
    let instance = await this.token
    let totalSupply = await instance.totalSupply();
    expect(instance.balanceOf(deployerAddress)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(receiver, sentTokens)).to.eventually.be.fulfilled;
    expect(instance.balanceOf(deployerAddress)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sentTokens)));
    return expect(instance.balanceOf(receiver)).to.eventually.be.a.bignumber.equal(new BN(sentTokens));
  })

  it("the symbol should be \"DRIP\"", async () => {
    let instance = await this.token
    const symbol = await instance.symbol();
    assert.equal(symbol, "DRIP", "The symbol should be \"DRIP\"")
  })

  it("is not possible to send more tokens than the total supply of tokens", async () => {
    let instance = await this.token
    let totalSupply = await instance.totalSupply();
    let balance = await instance.balanceOf(deployerAddress);
    expect(instance.balanceOf(deployerAddress)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(receiver, new BN(balance+1))).to.eventually.be.rejected;
    return expect(instance.balanceOf(deployerAddress)).to.eventually.be.a.bignumber.equal(balance);

  })


})

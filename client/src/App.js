import React, { Component } from "react";
import DripToken from "./contracts/DripToken.json";
import DripSale from "./contracts/DripSale.json";
import KYCContract from "./contracts/DripKYC.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded:false, kycAddress:"0x8498...", dripSaleAddress:null, userTokens:0, };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.dripInstance = new this.web3.eth.Contract(
        DripToken.abi,
        DripToken.networks[this.networkId] && DripToken.networks[this.networkId].address,
      );

      this.dripSale = new this.web3.eth.Contract(
        DripSale.abi,
        DripSale.networks[this.networkId] && DripSale.networks[this.networkId].address,
      );

      this.kyc = new this.web3.eth.Contract(
        KYCContract.abi,
        KYCContract.networks[this.networkId] && KYCContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToToken();
      this.setState({ loaded:true, dripSaleAddress: DripSale.networks[this.networkId].address}, this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
    let user = await this.dripInstance.methods.balanceOf(this.accounts[0]).call();
    this.setState({userTokens: user})


  }

  listenToToken =  () => {
    this.dripInstance.events.Transfer({to:this.accounts[0]}).on("data", this.updateUserTokens)
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }

  handleBuyTokens = async () =>{
    await this.dripSale.methods.buyTokens(this.accounts[0]).send({from:this.accounts[0], value:1})
  }

  handleKYCListing = async () => {
    await this.kyc.methods.setKYCComplete(this.state.kycAddress).send({from: this.accounts[0]});
    alert("KYC for " + this.state.kycAddress + " is approved")
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Your Flair must be dripping</h1>
        <p>Get your Drip tokens today</p>
        <h2>KYC Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange}/>
        <button type="button" onClick={this.handleKYCListing}>Add to whitelist</button>
        <p>Send ether to this address to buy your drip tokens</p>
        <h3>{this.state.dripSaleAddress}</h3>


        <p>You currently have {this.state.userTokens} DRIP</p>
        <button type="button" onClick={this.handleBuyTokens}>Buy more tokens</button>

      </div>
    );
  }
}

export default App;

const path = require("path");
require("dotenv").config({path: "./.env"});
const hdWallet = require("@truffle/hdwallet-provider");

const accountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      network_id: 5777,
      host: "127.0.0.1"
    },
    ganache_local:{
      provider : function(){
        return new hdWallet(process.env.MNEMONIC, "http://127.0.0.1:7545", accountIndex);
      },
      network_id:5777
    },

    goerli_infura:{
      provider : function(){
        return new hdWallet(process.env.MNEMONIC, "https://goerli.infura.io/v3/26c8de4afbe54d84b3b0ee5b5ffc4606", accountIndex);
      },
      network_id:5
    },

    ropsten_infura:{
      provider : function(){
        return new hdWallet(process.env.MNEMONIC, "https://ropsten.infura.io/v3/26c8de4afbe54d84b3b0ee5b5ffc4606", accountIndex);
      },
      network_id:3
    },


  },
  compilers: {
   solc: {
     version: "0.6.2"
        }
   }
};

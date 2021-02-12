"use strict"
var chai = require('chai');
const BN = web3.utils.BN;
var chai_bn = require("chai-bn")(BN);

chai.use(chai_bn);

var chaiPromise = require("chai-as-promised");
chai.use(chaiPromise);
module.exports = chai;

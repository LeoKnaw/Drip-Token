pragma solidity ^0.6.1;
import "./Crowdsale.sol";
import "./DripKYC.sol";

contract DripSale is Crowdsale {

    DripKYC kyc;

    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        DripKYC _kyc
    )
      //  MintedCrowdsale()
        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;
    }
    //
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view  override{
      super._preValidatePurchase(beneficiary, weiAmount);
      require (kyc.KYCComplete(msg.sender),"KYC incomplete");
    }
}

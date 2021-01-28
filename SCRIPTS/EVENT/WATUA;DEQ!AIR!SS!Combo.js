//WATUA;DEQ!AIR!SS!Combo
if (wfTask=="Public Comment" && matches(wfStatus, "Revise Permit", "No Revision Reqd")) {
	feeAmt=parseInt(AInfo['1 - 1st Price'])+ parseInt(AInfo['1 - 2nd Price'])+parseInt(AInfo['2 - 1st Price'])+ parseInt(AInfo['2 - 2nd Price'])+ parseInt(AInfo['3 - 1st Price'])+ parseInt(AInfo['3 - 2nd Price']);
	comment(feeAmt);
	addFee("PC-C1", "AIRSS COMBO","FINAL", feeAmt,"N" );
	}

if (wfTask=="Public Comment" && matches(wfStatus, "Revise Permit", "No Revision Reqd")) {
	feeAmt=parseInt(AInfo['1 - 1st Price']);
	comment(feeAmt);
	}

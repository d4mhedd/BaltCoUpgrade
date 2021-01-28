//ASIUA;Site!Sewer Waiver Request!NA!NA
if (!feeExists("DE0011") && AInfo['numWaivers'] != null) {
	addFee("DE0011","SEPTIC WAIVER","FINAL", AInfo['numWaivers'], "Y");
	}

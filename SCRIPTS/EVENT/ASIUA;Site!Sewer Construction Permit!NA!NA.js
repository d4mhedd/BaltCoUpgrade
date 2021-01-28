//ASIUA;Site!Sewer Construction Permit!NA!NA
SEWER_CONSTRUCTION_MODULE.updateASIbasedFees(capId);
if (AInfo['HCSTap'] != null) {
	updateFee("WW0023","SEWER CONSTRUCTION PERMIT","FINAL",AInfo['HCSTap'],"N");
	}

if (AInfo['largeLineTap'] != null) {
	updateFee("WW0021","SEWER CONSTRUCTION PERMIT","FINAL",AInfo['largeLineTap'],"N");
	}

if (AInfo['manholeTap'] != null) {
	updateFee("WW0022","SEWER CONSTRUCTION PERMIT","FINAL",AInfo['manholeTap'],"N");
	}

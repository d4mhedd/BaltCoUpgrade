//WATUA;Building!Model!NA!NA
if (wfTask=="Renewal" && matches(wfStatus,"Assess Fees") && !feeExists("DS0105", "NEW")) {
	addFee("DS0105", "DS_MODELPLAN", "FINAL", 1,"N");
	}

if (matches (wfTask,"DSD Invoicing", "Invoicing") && wfStatus=="Assess Fees") {
	FEE_UTILS_MODULE.assessBldgModelFees();
	}

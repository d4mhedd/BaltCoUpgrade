//WATUA;Site!Tentative Plat!NA!NA
if (wfTask == "Renewal" && wfStatus == "Extend App - No Fee") {
	DEV_ACCELA_ENG_1.completeRenewalNoFee();
	}

if (wfTask=="Renewal" && wfStatus=="Assess Fees") {
	addFee("DS0092", "DS_TENTATIVEPLAT", "Final", "1","N");
	}

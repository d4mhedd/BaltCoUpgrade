//WATUA;Site!Final Plat!NA!NA
if (wfTask=="Renewal" && wfStatus =="Extend App - No Fee") {
	DEV_ACCELA_ENG_1.completeRenewalNoFee();
	}

if (wfTask=="Renewal" && wfStatus=="Assess Fees") {
	addFee("DS0092", "FINAL PLAT", "Final", "1","N");
	}

if (wfTask=="Create Release of Assurance Table" && wfStatus=="Create Table") {
	APO_FUNCTIONS.populateReleaseOfAssuranceTable(capId);
	}

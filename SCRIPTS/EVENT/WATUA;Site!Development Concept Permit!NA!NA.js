//WATUA;Site!Development Concept Permit!NA!NA
if (wfTask=="Renewal" && wfStatus=="Assess Fees") {
	addFee("DS0091","DEVELOPMENT CONCEPT", "FINAL", 1, "N");
	}

if (wfTask=="Renewal" && wfStatus=="Invoice Fees") {
	branch("EMSE:InvoiceFeeNotification");
	}

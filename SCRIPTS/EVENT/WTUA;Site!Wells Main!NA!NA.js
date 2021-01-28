//WTUA;Site!Wells Main!NA!NA
if (wfTask == "Review" && wfStatus == "Inspection Required" && balanceDue == 0) {
	addFee("DE0028","WELLS MAIN","FINAL",1,"Y",capId);
	createPendingInspection("WE_WELLS_NOI","Well Site Inspection");
	}


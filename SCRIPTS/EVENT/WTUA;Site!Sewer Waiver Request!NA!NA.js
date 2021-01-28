//WTUA;Site!Sewer Waiver Request!NA!NA
if (wfTask == "Review" && ((wfStatus == "Approved" && balanceDue <= 0) || wfStatus == "Denied" || wfStatus == "Withdrawn")) {
	addStdCondition("General", "Record Locked", capId);
	}


//WTUB;Site!Sewer Waiver Request!NA!NA
if (wfTask == "Review" && wfStatus == "Approved" && (balanceDue >0)) {
	showMessage=true;
	comment("Fee balance must be $0.00 before proceeding.");
	cancel = true;
	}

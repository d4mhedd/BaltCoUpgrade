//WTUB;Site!Wells Main!NA!NA
if (wfTask == "Review" && wfStatus == "Approved"  && balanceDue >0) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding</font>");
	cancel=true;
	}

if (wfTask == "Review" && wfStatus == "Inspection Required" && balanceDue > 0) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding</font>");
	cancel=true;
	}
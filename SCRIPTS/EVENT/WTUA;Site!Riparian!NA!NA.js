//WTUA;Site!Riparian!NA!NA
if (wfTask == "Review" && wfStatus == "Request for Corrections") {
	setTask("Review","N","N");
	setTask("Application Intake","Y","N");
	}

if (wfTask == "Review" && (wfStatus == "Complete" || wfStatus == "Complete with Conditions")) {
	branch("Riparian:SendBOSEmail");
	}


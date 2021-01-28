//WTUA;Building!Public Records Request!NA!NA
if (isTaskActive("Review")) {
	assignTask("Application Intake",currentUserID);
	assignTask("Review",currentUserID);
	}

if (isTaskActive("Invoice Fees")) {
	assignTask("Invoice Fees",currentUserID);
	}

if (isTaskActive("Close Out")) {
	assignTask("Close Out",currentUserID);
	}
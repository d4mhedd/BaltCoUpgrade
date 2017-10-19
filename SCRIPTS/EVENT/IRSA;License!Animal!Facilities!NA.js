//DLH 171012 conversion begin

if (inspType == "Initial" && matches(inspResult, "3 - Satisfactory", "4 - Exceeds Standards", "5 - Excellent")) {
	branchTask("Inspection", "Satisfactory", "Updated by Script", "");
	activateTask("License Issuance");
	}

if (inspType == "Initial" && matches(inspResult, "1 - Unacceptable", "2 - Needs Improvement")) {
	updateTask("Inspection", "Unsatisfactory", "Updated by Script", "");
	}
	
//DLH 171012 conversion end
//WTUA;Enforcement!~!~!~
if ((wfTask == "Close Out") && (wfStatus == "Abated" || wfStatus.indexOf("Closed") != -1 || wfStatus == "No Violation")) {
	addStdCondition("General", "Record Locked", capId);
	}

if (appMatch("Enforcement/Complaints/NA/NA")) {
	branch ("Enforcment_Complaint_Assign_WF");
	}

if (appMatch("Enforcement/Violations/NA/NA")) {
	branch ("Enforcment_Violations_Assign_WF");
	}


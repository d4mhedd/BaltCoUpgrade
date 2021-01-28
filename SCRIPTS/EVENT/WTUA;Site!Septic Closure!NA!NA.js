//WTUA;Site!Septic Closure!NA!NA
if (wfTask == "Review" && matches(wfStatus, "Approved", "Denied")) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if (wfTask == "No Workflow" && wfStatus == "None") {
	updateAppStatus("Complete","Script");
	addStdCondition("General", "Record Locked", capId);
	}


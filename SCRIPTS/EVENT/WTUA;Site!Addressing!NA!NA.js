//WTUA;Site!Addressing!NA!NA
if (wfTask == "Addressing" && wfStatus == "Complete") {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if (wfTask == "Review" && (wfStatus == "Withdrawn" || wfStatus == "Denied")) {
	setTask("Review","N","Y");
	setTask("Close Out","Y","N");
	}

if (wfTask == "Review" && wfStatus=="Street Name Notices Sent") {
	editTaskDueDate("Review",dateAdd(null,15, "N"));
	}

if (wfTask == "Review" && wfStatus=="Single Lot/St. Name Complete") {
	editTaskDueDate("Addressing",dateAdd(null,2));
	}

if (wfTask == "Addressing" && wfStatus=="Complete" && AInfo['requestType'] == "Street Naming") {
	editAppSpecific("addressingAlertsDate", dateAdd(null,30,"N"));
	}

if (wfTask == "Addressing" && matches(wfStatus, "Complete", "Withdrawn")) {
	closeTask("Close Out", wfStatus,"Scripted","","AD_ADDRESSING2_PROCESS");
	addStdCondition("General", "Record Locked", capId);
	}

if (wfTask == "Review" && wfStatus == "Withdrawn") {
	closeTask("Close Out", "Withdrawn","Scripted","","AD_ADDRESSING2_PROCESS");
	addStdCondition("General", "Record Locked", capId);
	}

if (wfTask == "Review" && matches(wfStatus, "Plat/Plan Complete", "Single Lot/St. Name Complete")) {
	updateAppStatus("Approved");
	}

if (wfTask == "Review" && wfStatus == "Request for Corrections") {
	updateAppStatus("Request for Corrections");
	}


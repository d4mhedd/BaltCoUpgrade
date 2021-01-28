//WTUA;Site!Sewer Construction Permit!NA!NA
if (wfTask=="Admin Review" && wfStatus=="Withdrawn") {
	closeTask("Admin Review", "Withdrawn", "Closed via script","");
	deactivateTask("Review");
	activateTask("Close Out");
	updateAppStatus("Withdrawn","Script");
	}

if (wfTask=="Inspection" && wfStatus=="Withdrawn") {
	closeTask("Inspection", "Withdrawn", "Closed via script","");
	deactivateTask("ADEQ");
	activateTask("Close Out");
	}

if (wfTask=="Issuance" && wfStatus=="Denied") {
	closeTask("Issuance", "Denied", "Closed via script","");
	deactivateTask("Inspection");
	activateTask("Close Out");
	updateAppStatus("Denied","Script");
	}

if (AInfo['permitType'] == "Sewer Construction Permit" && wfTask == "Acceptance" && wfStatus == "Final Acceptance") {
	createPendingInspection("WP_SCP","Plug Removal");
	}

if (wfTask == "Inspection" && wfStatus == "Final Inspection Approved") {
	editAppSpecific("FEUacceptanceDate", dateAdd(null, 0));
	}


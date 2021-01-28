//WTUA;Planning!Conditional Use!~!~
if (wfTask=="Initial Hearing" && wfStatus=="Withdrawn") {
	closeTask("Initial Hearing", "Withdrawn", "Closed via script", "");
	deactivateTask("BOS Staff Report");
	activateTask("Close Out");
	}

if (wfTask=="Initial Hearing" && wfStatus=="Denied") {
	closeTask("Initial Hearing", "Denied", "Closed via script", "");
	deactivateTask("BOS Staff Report");
	activateTask("Close Out");
	}

if (wfTask=="BOS Hearing" && wfStatus=="Withdrawn") {
	closeTask("BOS Hearing", "Withdrawn", "Closed via script", "");
	deactivateTask("Initial Hearing");
	deactivateTask("Issuance");
	activateTask("Close Out");
	}

if (wfTask=="BOS Hearing" && wfStatus=="Denied") {
	closeTask("BOS Hearing", "Denied", "Closed via script", "");
	deactivateTask("Initial Hearing");
	deactivateTask("Issuance");
	activateTask("Close Out");
	}

if (wfTask=="Issuance" && wfStatus=="Issued") {
	var params =aa.util.newHashMap();
	params.put("PermitNumber", capId.getCustomID());
	WFMODULE.displayReportFromWorkflow("General Permit", params);
	}

if ((matches(wfTask, "Initial Hearing", "BOS Hearing") && matches(wfStatus, "Approved", "Denied"))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}


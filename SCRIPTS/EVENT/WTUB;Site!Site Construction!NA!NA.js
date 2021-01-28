//WTUB;Site!Site Construction!NA!NA
if (wfTask="Close Out" && matches(wfStatus,"Final","Withdrawn") && !DEV_LYNDA_WACHT.allInspectionsPassed()) {
	showMessage=true;
	comment("All inspections must be completed before the record can be closed.");
	cancel=true;
	}

if (wfTask == "Close Out" && matches(wfStatus, "Final", "Withdrawn") && balanceDue > 0) {
	showMessage=true;
	comment("Record cannot be closed until all fees have been paid.");
	cancel=true;
	}

if (balanceDue <=0 && wfTask == "Issuance" && wfStatus == "Issued" && matches(AInfo['permitExpiration'],"",null)) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,36)));
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,36)));
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask == "Issuance" && wfStatus == "Issued") {
	editAppSpecific("permitExpiration",(dateAddMonths(null,36)));
	}

if (wfTask=="Issuance" && wfStatus=="Issued") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "General Permit", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	WFMODULE.updateTaskPima("Issuance", "Issued","Successfully issued", "Closed via script");
	}


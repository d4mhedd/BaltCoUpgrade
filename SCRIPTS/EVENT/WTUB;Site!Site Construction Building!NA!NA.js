//WTUB;Site!Site Construction Building!NA!NA
if (wfTask == "Close Out" && matches(wfStatus,"Void","C of O") && balanceDue > 0) {
	showMessage=true;
	comment("Record cannot be closed until all fees are paid.");
	cancel = true;
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() && matches(AInfo['permitExpiration'],"",null)) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,12)));
	}

if (balanceDue<=0 && wfTask == "Issuance" && wfStatus == "Issued" && matches(AInfo['permitExpiration'],"",null)) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,12)));
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask == "Review Consolidation" && wfStatus=="Denied") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Application Denial", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask == "Close Out" && matches(wfStatus,"C of O")) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Certificate of Occupancy", reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	WFMODULE.updateTaskPima("Issuance", "Issued","Successfully issued", "Closed via script");
	}

if (cancel==false  && wfTask=="Issuance" && wfStatus=="Issued" && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	var params =aa.util.newHashMap();
	params.put("PermitNumber",capId.getCustomID());
	WFMODULE.displayReportFromWorkflow("General Permit", params);
	}


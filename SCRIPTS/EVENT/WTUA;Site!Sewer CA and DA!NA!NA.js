//WTUA;Site!Sewer CA and DA!NA!NA
if (wfTask=="Review" && wfStatus=="Withdrawn") {
	closeTask("Review", "Withdrawn", "Closed via script", "");
	closeTask("Close Out", "Withdrawn", "Closed via script", "");
	deactivateTask("Appeal");
	}

if (wfTask=="Construction Authorization" &&wfStatus=="Issue CA") {
	editAppSpecific("applicationExpiration",dateAdd(null,731,"N"));
	}

if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	SEWER_CADA_FUNCTIONS.assessFees(capId);
	}

if (wfTask == "Construction Authorization" && wfStatus == "Issue CA" && AInfo['siteBlgRequired'] == "No") {
	var params = aa.util.newHashMap();
	WFMODULE.displayReportFromWorkflow("Sewer CA and DA Construction Authorization", params);
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask=="Review" && wfStatus=="Applicability Review Complete") {
	closeTask("Review", "Applicability Review Complete", "Closed via script", "");
	closeTask("Close Out", "Applicability Review Complete", "Closed via script", "");
	deactivateTask("Appeal");
	}


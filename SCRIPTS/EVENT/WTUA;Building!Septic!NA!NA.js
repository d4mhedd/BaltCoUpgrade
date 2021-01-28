//WTUA;Building!Septic!NA!NA
if (wfTask == "Review" && wfStatus == "Withdrawn") {
	setTask("Review","N","Y");
	setTask("Close Out","Y","N");
	}

if ((wfTask == "Pre-CA Invoice Review" || wfTask == "Pre-DA Invoice Review") && wfStatus == "Assess Fees") {
	FEE_UTILS_MODULE.removeAllFeesExcept(capId,["DE0018"]);
	SEPTICMODULE.assessFees(capId);
	}

if ((wfTask == "Pre-CA Invoice Review" || wfTask == "Pre-DA Invoice Review") && wfStatus == "Invoice Fees") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("capID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Invoice Fees";
	reportParams.put("capID", capId.getCustomID());
	reportParams.put("invoicenbr", FEE_UTILS_MODULE.getUnpaidInvoice2(capId).toString());
	UTILITYMODULE.sendEmail(capId, "Invoice_Param", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", "Septic", "WTUA", null);
	}

if (((wfTask == "Construction Authorization" && wfStatus == "Issue CA") || (wfTask == "Discharge Authorization" && wfStatus == "Issue DA")) && AInfo['septicType'] == "Conventional") {
	UTILITYMODULE.sendSurveyEmail(capId);
	}
//WTUA;Building!DamageDemo!NA!NA
if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = "Deficient";
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "AA_NOTICE OF ADMIN REVIEW DEFICIENCY",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, null, null, "AA ADMIN COMPLETE",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask == "Review Consolidation" && wfStatus == "Denied") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Denied";
	UTILITYMODULE.sendEmail(capId, "Notice of Application Denial", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", "DamageDemo", "WTUA", null);
	}

if (wfTask == "Review Consolidation" && wfStatus == "Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Request for Corrections";
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", "DamageDemo", "WTUA", null);
	}

if (wfTask == "Invoicing" && wfStatus == "Invoice Fees") {
	var reportParams = aa.util.newHashMap();
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Approved";
	reportParams.put("capID", capId.getCustomID());
	reportParams.put("invoicenbr", FEE_UTILS_MODULE.getUnpaidInvoice2(capId).toString());
	UTILITYMODULE.sendEmail(capId, "Invoice_Param", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", "DamageDemo", "WTUA", null);
	}

if (wfTask == "Issuance" && wfStatus == "Issued") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Issued";
	UTILITYMODULE.sendEmail(capId, "General Permit", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", "DamageDemo", "WTUA", null);
	}

if (wfTask == "Routing" && wfStatus == "In Review" && AInfo['IWC Review'] == "CHECKED") {
	UTILITYMODULE.sendIWCemail(capId);
	}

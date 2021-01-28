//WTUA;Building!Oversize Overweight Vehicle!NA!NA
if ((wfTask == "Invoice" && wfStatus == "Assess Fees")) {
	branch("Oversize:Fees");
	}

if (wfTask == "Invoice" && wfStatus == "Invoice Fees") {
	branch("Oversize:Invoice Fees");
	}

if (wfTask == "Review Consolidation" && wfStatus == "Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Request for Corrections";
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", "Oversize Overweight Vehicle", "WTUA", null);
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = "Deficient";
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "AA_NOTICE OF ADMIN REVIEW DEFICIENCY",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask == "Issuance" && wfStatus == "Issued") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = "Issued";
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, "Oversize-Overweight Permit", reportParams, "AA_GENERAL_PERMIT_OVERSIZE",templateParameters, "Applicant", "Oversize Overweight Vehicle", "WTUA", null);
	}

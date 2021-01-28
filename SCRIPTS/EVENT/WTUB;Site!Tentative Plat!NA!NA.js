//WTUB;Site!Tentative Plat!NA!NA
if (wfTask == "Issuance" && wfStatus == "Issued") {
	editAppSpecific("permitExpiration",(dateAddMonths(null,36)));
	}

if (wfTask=="Admin Review" && wfStatus=="Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency",  reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask=="Review Consolidation" && wfStatus=="Approved") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Project Approval",  reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask=="Review Consolidation" && wfStatus=="Denied") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Application Denial",  reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask=="Issuance" && wfStatus=="Issued") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "General Permit", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}




//WTUB;Building!Oversize Overweight Vehicle!NA!NA
if (wfTask == "Issuance" && wfStatus == "Issued"  && (balanceDue >0)) {
	showMessage=true;
	comment("Fee balance must be $0.00 before proceeding");
	cancel=true;
	}

if (wfTask == "Review Consolidation" && wfStatus == "Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections", reportParams, "","", "Applicant", "Oversize Overweight Vehicle", "WTUB", null);
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "","", "Applicant", "Oversize Overweight Vehicle", "WTUB", null);
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "","", "Applicant", "Oversize Overweight Vehicle", "WTUB", null);
	}

if (wfTask == "Issuance" && wfStatus == "Issued") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Oversize-Overweight Permit", reportParams, "","", "Applicant", "Oversize Overweight Vehicle", "WTUB", null);
	}


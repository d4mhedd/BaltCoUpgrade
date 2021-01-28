//WTUB;Site!Development Concept Permit!NA!NA
if (balanceDue >0 && wfTask=="Issuance" && wfStatus =="Issued") {
	showMessage=true;
	comment("$"+balanceDue.toFixed(2)+" is owed and must be paid before permit can be issued.");
	cancel=true;
	}

if (balanceDue <= 0 && wfTask=="Issuance" && wfStatus=="Issued") {
	editAppSpecific("permitExpiration",(dateAddMonths(null,36)));
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask=="Issuance" && wfStatus=="Issued") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "General Permit", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}



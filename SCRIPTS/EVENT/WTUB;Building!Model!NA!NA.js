//WTUB;Building!Model!NA!NA
if ((wfTask=="Invoicing" || wfTask == "Issuance") && AInfo['modelType'] == null) {
	comment("<b><font color=RED>Model Type ASI is a required field and should be set prior to invoicing.</font></b>");
	cancel=true;
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask=="Issuance" && wfStatus=="Issued" && balanceDue>0) {
	showMessage=true;
	comment("Permit cannot be issued until fees are paid: " + balanceDue + " is currently due.");
	cancel=true;
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && matches(AInfo['permitExpiration'],"",null)) {
	editAppSpecific("permitExpiration",dateAddMonths(null,36));
	}

if (wfTask=="Issuance" && wfStatus=="Issued" && matches(AInfo['permitExpiration'],"",null)) {
	editAppSpecific("permitExpiration",dateAddMonths(null,36));
	}

if ((cancel==false)  && wfTask=="Issuance" && wfStatus=="Issued" && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Model Plan Approval", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if ((cancel==false)  &&  appMatch("Building/Model/NA/NA") && ((wfTask=="Invoicing" && wfStatus=="No Additional Fees Required") || ( wfTask=="Issuance" && wfStatus=="Issued"))) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "General Permit", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

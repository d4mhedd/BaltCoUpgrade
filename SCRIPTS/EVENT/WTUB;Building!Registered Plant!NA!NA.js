//WTUB;Building!Registered Plant!NA!NA
if (wfTask=="Issuance" && wfStatus=="Issued" && (feeExists("DS0102","NEW") || balanceDue>0)) {
	showMessage=true;
	comment("Permit cannot be issued until fees are paid.");
	cancel=true;
	}

if (wfTask=="Issuance" && wfStatus=="Issued") {
	toDay=new Date();
	editAppSpecific("permitExpiration", "12/31/"+toDay.getFullYear().toString());
	}

if (wfTask == "Review" && wfStatus == "Approved") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Project Approval", reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUB", null);
	}



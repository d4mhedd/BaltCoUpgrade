//WTUB;Planning!Zoning Use!NA!NA
if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUB", null);
	}


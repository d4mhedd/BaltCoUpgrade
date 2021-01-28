//WTUA;Building!CHFS – Health Review!NA!NA
var shouldSetReviewDate = (wfTask == "Admin Review" && wfStatus == "Administratively Complete");
if (shouldSetReviewDate) {
	editTaskDueDate("Review",dateAdd(null,10,"Y"));
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "AA ADMIN COMPLETE",templateParameters, "Applicant", "CHFS – Health Review", "WTUA", null);
	}

if (wfTask == "Review" && wfStatus == "Approved") {
	editAppSpecific("permitExpiration",dateAdd(dateAddMonths(null,12),1));
	}

if (wfTask == "Review" && wfStatus == "Approved") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Approved";
	UTILITYMODULE.sendEmail(capId, "Notice of Project Approval", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", "CHFS – Health Review", "WTUA", null);
	}

if (wfTask == "Review" && wfStatus == "Request for Corrections") {
	UTILITYMODULE.sendApplicationStatusUpdateEmail(capId, capStatus, "Notice Request for Corrections_AllSingleReview");
	}
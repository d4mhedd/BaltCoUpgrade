//WTUB;Building!CHFS – Health Review!NA!NA
if (wfTask == "Admin Review" && wfStatus == "Administratively Complete" && (balanceDue >0)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding</font>");
	cancel=true;
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete" && (balanceDue <= 0)) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "","", "Applicant", "CHFS – Health Review", "WTUB", null);
	}

var iwcTaskExists = false;
if (typeof taskStatus("IWC Review","ADHOC_WORKFLOW_NAME") != "undefined") {
	iwcTaskExists = true;
	}

var haveIWCReviewTaskInApprovedCondition = (iwcTaskExists && !isTaskStatus("IWC Review","Approved"));
if (wfTask == "Review" && wfStatus == "Approved" && haveIWCReviewTaskInApprovedCondition) {
	showMessage=true;
	comment("<font color='red'>IWC Review must be approved before proceeding.</font>");
	cancel=true;
	}

if (wfTask == "Review" && wfStatus == "Approved" && haveIWCReviewTaskInApprovedCondition) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Project Approval", reportParams, "","", "Applicant", "CHFS – Health Review", "WTUB", null);
	}

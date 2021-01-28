//WTUB;Building!Construction Noise Permit!NA!NA
if (wfTask == "Issuance" && wfStatus == "Issued" && (balanceDue >0)) {
	showMessage=true;
	comment("Fee balance must be $0.00 before proceeding.");
	cancel = true;
	}

if (wfTask == "Issuance" && wfStatus == "Issued" && DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() != false) {
	showMessage=true;
	comment("There is a Prior to Issuance condition on this record.");
	cancel = true;
	}

if (wfTask == "Review" && wfStatus == "Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", reportParams, "","", "Applicant", "Construction Noise Permit", "WTUB", null);
	}
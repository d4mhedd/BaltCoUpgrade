//WTUA;Building!Green Building Certification!NA!NA
if (wfTask == "Close Out" && (wfStatus == "Certification Achieved" || wfStatus == "Certification Not Achieved" || wfStatus == "Withdrawn")) {
	addStdCondition("General", "Record Locked", capId);
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	UTILITYMODULE.sendApplicationStatusUpdateEmail(capId, capStatus, "Notice Request for Corrections_AllSingleReview");
	}

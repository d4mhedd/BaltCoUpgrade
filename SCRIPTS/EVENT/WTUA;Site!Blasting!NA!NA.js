//WTUA;Site!Blasting!NA!NA
if (wfTask == "Issuance" && wfStatus == "Issued") {
	editAppSpecific("permitExpiration", dateAdd(null,30,"N"));
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_NOTICE OF ADMIN REVIEW DEFICIENCY", "Applicant", "Notice of Admin Review Deficiency", "SITE");
	}

if (wfTask == "Review" && wfStatus == "Request for Corrections") {
	UTILITYMODULE.sendApplicationStatusUpdateEmail(capId, capStatus, "Notice Request for Corrections_AllSingleReview");
	}


//WTUB;Site!S10 Certificate of Coverage!NA!NA
var advancingWorkflow = false;
if ((wfTask == "Admin Review" && wfStatus == "Application Paid") || (wfTask == "Review" && matches(wfStatus, "Paid", "Legal Doc Not Required")) || (wfTask == "Authorization" && wfStatus == "Authorized")) {
	advancingWorkflow = true;
	}

if (advancingWorkflow && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding on to the next workflow task.</font>");
	cancel=true;
	}

if (wfTask == "Close Out" && wfStatus == "Executed" && !S10_SITE.isGradingInspectionPassedOrPartial(parentCapId)) {
	showMessage=true;
	comment("<font color='red'>The parent site record must have a passed or partial grading inspection prior to Executing the Section 10 coverage.</font>");
	cancel = true;
	}


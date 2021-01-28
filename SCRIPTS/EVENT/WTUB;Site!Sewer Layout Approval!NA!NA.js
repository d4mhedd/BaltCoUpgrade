//WTUB;Site!Sewer Layout Approval!NA!NA
loadASITables();
var reSubmitted= wfTask == "Application Intake" && wfStatus == "Resubmit";
if (reSubmitted && PAGESUBMITTALDETAILS.length != (parseInt(AInfo['submittalCounter']) +1)) {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the Page Submittal Details Table contains information for this submittal.</font></b>");
	cancel=true;
	}

var chkLim = new Array();
chkLim = DEV_LYNDA_WACHT.checkConditionLimiters("WTUB - Prior to Record Type Approval");
if (wfTask == "Review Consolidation" && wfStatus == "Approved" && matches(chkLim[0],"Cancel", "Fail")) {
	showMessage=true;
	comment("<font color='red'>There is a Prior to Approval condition on this record.</font>");
	cancel = true;
	}

if (wfTask == "Sewer Layout Approval" && wfStatus == "Issued"  && AInfo['siteBlgRequired'] == "No" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00.</font>");
	cancel=true;
	}

if (wfTask == "Sewer Layout Approval" && wfStatus == "Issued" && AInfo['siteBlgRequired'] == "Yes") {
	FEE_UTILS_MODULE.invoiceAllFees(capId);
	showMessage=true;
	comment("<font color='green'>Add Fees and any appropriate Conditions to Site or Building record.</font>");
	}

if (wfTask == "Review Consolidation" && wfStatus == "Denied" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00.</font>");
	cancel=true;
	}



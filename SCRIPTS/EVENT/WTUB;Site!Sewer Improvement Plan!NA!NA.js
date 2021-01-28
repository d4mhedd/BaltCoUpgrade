//WTUB;Site!Sewer Improvement Plan!NA!NA
loadASITables();
var reSubmitted= wfTask == "Application Intake" && wfStatus == "Resubmit";
if (reSubmitted && PAGESUBMITTALDETAILS.length != (parseInt(AInfo['submittalCounter']) +1)) {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the Page Submittal Details Table contains information for this submittal.</font></b>");
	cancel=true;
	}

if (wfTask == "Close Out" && wfStatus == "Complete" && (typeof(LOTINFORMATION) == "undefined" || LOTINFORMATION.length==0) && AInfo['countyFinalPlatRequired'] == "Yes") {
	showMessage=true;
	comment("<font color='red'>Must have lot information when county final plat is required to proceed.</font>");
	cancel=true;
	}

if (wfTask == "Acceptance Letter" && wfStatus == "Issued" && AInfo['siteBlgRequired'] == "No" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00.</font>");
	cancel=true;
	}

if (wfTask == "Acceptance Letter" && wfStatus == "Issued" && AInfo['siteBlgRequired'] == "Yes") {
	FEE_UTILS_MODULE.invoiceAllFees(capId);
	showMessage=true;
	comment("<font color='green'>Add Fees and any appropriate Conditions to Site or Building record.</font>");
	}

if (wfTask == "Acceptance Letter" && wfStatus == "Issued" && DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() != false) {
	aa.print(DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	showMessage=true;
	comment("<font color='red'>There is a Prior to Issuance condition on this record.</font>");
	cancel = true;
	}

if (wfTask == "Approval Letter" && wfStatus == "Issued" && AInfo['siteBlgRequired'] == "No" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00.</font>");
	cancel=true;
	}

if (wfTask == "Approval Letter" && wfStatus == "Issued" && AInfo['siteBlgRequired'] == "Yes") {
	FEE_UTILS_MODULE.invoiceAllFees(capId);
	showMessage=true;
	comment("<font color='green'>Add Fees and any appropriate Conditions to Site or Building record.</font>");
	}

if (wfTask == "Approval Letter" && wfStatus == "Issued" && DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() != false) {
	aa.print(DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	showMessage=true;
	comment("<font color='red'>There is a Prior to Issuance condition on this record.</font>");
	cancel = true;
	}


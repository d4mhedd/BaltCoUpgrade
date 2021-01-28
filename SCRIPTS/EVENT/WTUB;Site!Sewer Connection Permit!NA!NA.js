//WTUB;Site!Sewer Connection Permit!NA!NA
if (wfTask == "Issuance" && wfStatus == "Issued" && AInfo['siteBlgRequired'] == "No" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00.</font>");
	cancel=true;
	}

if (wfTask == "Issuance" && wfStatus == "Issued" && AInfo['siteBlgRequired'] == "Yes") {
	FEE_UTILS_MODULE.invoiceAllFees(capId);
	showMessage=true;
	comment("<font color='green'>Add Fees and any appropriate Conditions to Site or Building record.</font>");
	}

if ((wfTask == "Review Consolidation" && wfStatus == "Approved") && (AInfo['permitSubtype'] == null || AInfo['typeIIICapacityLetterOrApplicationAttached'] == null || AInfo['typeIIISewerageCapacityAvailableReqStarted'] == null || AInfo['siteBlgRequired'] == null)) {
	showMessage=true;
	comment("<font color='red'>All required ASI field must be populated.</font>");
	cancel=true;
	}

if ((wfTask == "Review Consolidation" && wfStatus == "Approved")) {
	var bASIT = loadASITable("METERS", capId);
	}

if ((wfTask == "Review Consolidation" && wfStatus == "Approved") && (typeof bASIT != "object" || bASIT.length <= 0)) {
	showMessage=true;
	comment("<font color='red'>The METERS ASIT must contain at least one row.</font>");
	cancel=true;
	}

if (wfTask == "Review Consolidation") {
	var asit = loadASITable("METERS", capId);
	var status = asit[0]["Status"];
	}

if (wfTask == "Review Consolidation" && typeof(METERS) != "object") {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the METERS Table contains at least one row.</font></b>");
	cancel=true;
	}

if (typeof(METERS) == "object" && wfTask == "Review Consolidation" && (status == "" || status == null)) {
	showMessage=true;
	comment("<font color='red'>Please enter a value for the ASIT field 'Status'</font>");
	cancel=true;
	}



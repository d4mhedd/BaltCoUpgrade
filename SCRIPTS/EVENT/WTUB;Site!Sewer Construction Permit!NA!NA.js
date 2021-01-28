//WTUB;Site!Sewer Construction Permit!NA!NA
if (wfTask == "Admin Review") {
	showMessage = false;
	}

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

if (wfTask == "Issuance" && wfStatus == "Issued" && AInfo['permitType'] != "Sewer Construction Permit") {
	editAppSpecific("permitExpiration", dateAddMonths(null, 6));
	}

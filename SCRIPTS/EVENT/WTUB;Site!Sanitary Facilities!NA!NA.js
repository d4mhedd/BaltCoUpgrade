//WTUB;Site!Sanitary Facilities!NA!NA
if (wfTask == "Issuance" && wfStatus == "Issued" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding.</font>");
	cancel=true;
	}


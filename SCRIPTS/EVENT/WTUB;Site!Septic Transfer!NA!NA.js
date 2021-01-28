//WTUB;Site!Septic Transfer!NA!NA
if (wfTask == "Close Out" && wfStatus == "Issued"  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("Fee balance must be $0.00 before proceeding");
	cancel=true;
	}

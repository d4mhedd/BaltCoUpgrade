//WTUB;Building!Public Records Request!NA!NA
if (wfTask == "Close Out" && wfStatus == "Document Sent"  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding</font>");
	cancel=true;
	}

if (wfTask == "Invoice Fees" && wfStatus == "Payment Received"  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding</font>");
	cancel=true;
	}


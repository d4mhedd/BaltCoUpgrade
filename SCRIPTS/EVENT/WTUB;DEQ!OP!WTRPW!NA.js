//WTUB;DEQ!OP!WTRPW!NA
if (wfTask=="Invoice Fees" && wfStatus=="Payment Received" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>All fees must be paid before setting the status to Payment Received.</font>");
	cancel = true;
	}

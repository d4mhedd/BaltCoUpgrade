//WTUB;Site!Public Water AOC ATC!NA!NA
if (wfTask == "Approval to Construct" && matches(wfStatus, "Issue ATC - ADEQ AOC Required", "Issue ATC") && (FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId))) {
	showMessage=true;
	comment("Fee balance must be $0.00 before proceeding.");
	cancel = true;
	}

if (wfTask == "Approval to Construct" && wfStatus == "Documents Received" && (balanceDue >0)) {
	showMessage=true;
	comment("Fee balance must be $0.00 before proceeding.");
	cancel = true;
	}


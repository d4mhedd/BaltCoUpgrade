//WTUB;Building!Green Building Certification!NA!NA
if (wfTask == "Issuance" && (wfStatus == "Certification Call Scheduled" || wfStatus == "Issued") && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before proceeding</font>");
	cancel = true;
	}

var finalInspectionPassed = checkInspectionResult("Final Inspection","Pass");
var preDrywallInspectionPassed = checkInspectionResult("Pre-Drywall Inspection","Pass");
if (((finalInspectionPassed == false) || (preDrywallInspectionPassed == false)) && wfTask == "Inspections" && wfStatus == "Final Inspection Approved") {
	showMessage=true;
	comment("<font color='red'>All Required inspections must be Passed before proceeding to next step.</font>");
	cancel=true;
	}

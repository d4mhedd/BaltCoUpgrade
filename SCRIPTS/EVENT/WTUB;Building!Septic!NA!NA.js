//WTUB;Building!Septic!NA!NA
var OUTSTANDING_BALANCE_MESSAGE = "Fee balance must be $0.00 before proceeding.";
if (wfTask == "Admin Review" && wfStatus == "Administratively Complete"  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment(OUTSTANDING_BALANCE_MESSAGE);
	cancel=true;
	}

if (wfTask == "Construction Authorization" && wfStatus == "Issue CA"  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment(OUTSTANDING_BALANCE_MESSAGE);
	cancel=true;
	}

if (wfTask == "Discharge Authorization" && wfStatus == "Issue DA"  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment(OUTSTANDING_BALANCE_MESSAGE);
	cancel=true;
	}

if ((wfTask == "Pre-CA Invoice Review" || wfTask == "Pre-DA Invoice Review") && wfStatus == "Invoice Fees" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage= true;
	comment("<font color='red'>Fee balance must be greater than $0.00 before proceeding.</font>");
	cancel=true;
	}

if ((wfTask == "Pre-CA Invoice Review" || wfTask == "Pre-DA Invoice Review") && wfStatus == "Invoice Fees" && FEE_UTILS_MODULE.getAssessedButNotInvoicedFeeBalance(capId) > 0) {
	FEE_UTILS_MODULE.invoiceAllFees(capId);
	}

if ((wfTask == "Pre-CA Invoice Review" || wfTask == "Pre-DA Invoice Review") && wfStatus == "Invoice Fees") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("capID", capId.getCustomID());
	reportParams.put("invoicenbr", FEE_UTILS_MODULE.getUnpaidInvoice2(capId).toString());
	UTILITYMODULE.sendEmail(capId, "Invoice_Param", reportParams, "","", "Applicant", "Septic", "WTUB", null);
	}

if (wfTask == "Construction Authorization" && wfStatus == "Issue CA") {
	editAppSpecific("permitExpiration",dateAddMonths(dateAdd(null,1,"N"),24));
	}




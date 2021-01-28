//WTUB;Site!Sewer CA and DA!~!~
if (wfTask=="Construction Authorization" && feeExists("DE-WTR$$-01","NEW") && AInfo['siteBlgRequired'] == "No") {
	showMessage = true;
	comment ("The fees have not been invoiced, but there are fees due.  Please verify invoiced fees before continuing");
	cancel= true;
	}

if (wfTask=="Construction Authorization" && matches(wfStatus,"Issue CA","Issue CA - ADEQ DA Required") && AInfo['siteBlgRequired'] == "No" && balanceDue>0) {
	showMessage = true;
	comment("Permit cannot be issued until all fees are paid: $" + balanceDue + " is currently due");
	cancel = true;
	}

if (wfTask == "Invoicing" && wfStatus == "Invoice Fees") {
	SEWER_CADA_FUNCTIONS.invoiceFees(capId);
	}

if (wfTask == "Construction Authorization" && matches(wfStatus,"Issue CA","Issue CA - ADEQ DA Required") && AInfo['siteBlgRequired'] == "Yes") {
	FEE_UTILS_MODULE.invoiceAllFees(capId);
	showMessage=true;
	comment("<font color='green'>Add Fees and any appropriate Conditions to Site or Building record.</font>");
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}


//WTUB;Building!Right of Way!NA!NA
if (wfTask == "Invoicing" && wfStatus == "Invoice Fees") {
	FEE_UTILS_MODULE.invoiceAllFees();
	}

if (wfTask == "Issuance" && wfStatus == "Issued" && MODIFICATIONS.length == 0) {
	ROWMODULE.setExpirationDate(capId);
	}

if (wfTask == "Issuance" && wfStatus == "Issued"  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before issuing permit.</font>");
	cancel=true;
	}

if (cancel == false && wfTask == "Issuance" && wfStatus == "Issued") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Right of Way Permit", reportParams, "","", "Applicant", "Right of Way", "WTUB", null);
	}

if (wfTask == "Inspection" && (wfStatus == "Final Inspection Complete" || wfStatus =="Not Required" || wfStatus =="Revoked")  && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	showMessage=true;
	comment("<font color='red'>Fee balance must be $0.00 before issuing permit.</font>");
	cancel=true;
	}

if ((wfTask == "Review Consolidation" && wfStatus == "Approved") && (AInfo['constructionCost'] == null && AInfo['linearFeetOfROWDisturbed'] == null)) {
	cancel = true;
	showMessage=true;
	comment("<font color='red'>You must enter either a Construction Cost Estimate OR Admin fees based on Linear Feet</font>");
	}

if (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['constructionType'] == null) {
	showMessage=true;
	comment("<font color='red'>A value must be entered for the Construction Type ASI field</font>");
	cancel = true;
	}

if (wfTask == "Review Consolidation" && AInfo['trs']== null) {
	showMessage=true;
	comment("<font color='red'>A value must be entered for the TRS ASI field</font>");
	cancel = true;
	}


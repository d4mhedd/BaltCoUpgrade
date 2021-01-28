//WTUB;Building!DamageDemo!NA!NA
if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	var reportParams = aa.util.newHashMap();
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "","", "Applicant", "DamageDemo", "WTUB", null);
	}

if (wfTask == "Review Consolidation" && wfStatus == "Denied") {
	var reportParams = aa.util.newHashMap();
	UTILITYMODULE.sendEmail(capId, "Notice of Application Denial", reportParams, "","", "Applicant", "DamageDemo", "WTUB", null);
	}

if (wfTask == "Review Consolidation" && wfStatus == "Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections", reportParams, "","", "Applicant", "DamageDemo", "WTUB", null);
	}

if (wfTask == "Invoicing" && wfStatus == "Assess Fees" && ((!feeExists("DS0094") && !feeExists("DS0095")) || !feeExists("DS0099"))) {
	branch("DamageDemo:Fees");
	}

if (wfTask == "Invoicing" && wfStatus == "Invoice Fees") {
	branch("DamageDemo:FeesInvoice");
	}

if (wfTask == "Invoicing" && wfStatus == "Invoice Fees") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("capID", capId.getCustomID());
	reportParams.put("invoicenbr", FEE_UTILS_MODULE.getUnpaidInvoice2(capId));
	UTILITYMODULE.sendEmail(capId, "Invoice_Param", reportParams, "","", "Applicant", "Damage/Demo", "WTUB", null);
	}

if (wfTask == "Issuance" && wfStatus == "Issued"  && (balanceDue >0)) {
	showMessage=true;
	comment("Fee balance must be $0.00 before proceeding");
	cancel=true;
	}

if (wfTask == "Issuance" && wfStatus == "Issued") {
	editAppSpecific("permitExpiration",dateAdd(null,365));
	}

if (wfTask == "Issuance" && wfStatus == "Issued") {
	var reportParams = aa.util.newHashMap();
	UTILITYMODULE.sendEmail(capId, "General Permit", reportParams, "","", "Applicant", "DamageDemo", "WTUB", null);
	}

if (wfTask == "Inspection" && wfStatus == "Final Inspection Complete"  && AInfo['subType'] == "Wind/Water/Fire Damage" && !checkInspectionResult("Investigative Inspection","Pass")) {
	showMessage=true;
	comment("You must pass <b>Investigative Inspection</b> before a permit can be Issued.");
	cancel=true;
	}

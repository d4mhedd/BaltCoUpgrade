//WTUA;Building!Right of Way!NA!NA
if (((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask == "Close Out" && wfStatus == "Final")) && AInfo['deptPlanReview'] == "DSD") {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if (wfTask == "Issuance" && wfStatus == "Issued") {
	ROWMODULE.sendPermitAsync();
	}

if (wfTask == "Inspection" && wfStatus == "Revisions with Review") {
	ROWMODULE.assessFees(capId);
	setTask("Inspection","N","Y");
	setTask("Invoicing","Y","N");
	}

if (wfTask == "Inspection" && wfStatus == "Revisions") {
	ROWMODULE.assessFees(capId);
	setTask("Inspection","N","Y");
	setTask("Invoicing","Y","N");
	}

if (wfTask == "Issuance" && (wfStatus=="Revisions" || wfStatus=="Revisions with Review")) {
	ROWMODULE.assessFees2(capId);
	setTask("Issuance","N","Y");
	setTask("Invoicing","Y","N");
	}

if (wfTask == "Review Consolidation" && wfStatus == "Revisions with Review") {
	ROWMODULE.assessFees(capId);
	setTask("Review Consolidation","N","Y");
	setTask("Routing","Y","N");
	}

if (wfTask == "Review Consolidation" && wfStatus == "Revisions") {
	ROWMODULE.assessFees(capId);
	}

if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	ROWMODULE.assessFees(capId);
	}

if (wfTask == "Invoicing" && wfStatus == "No Additional Fees Required") {
	var expDays = ROWMODULE.getExpirationDays(capId);
	editAppSpecific("permitExpiration",dateAdd(null,expDays));
	}

if (wfTask == "Invoicing" && wfStatus=="Invoice Fees" && AInfo['payByTrust']=="No") {
	ROWMODULE.sendInvoice(capId);
	}

if (wfTask=="GIS Update" && wfStatus == "DOT-GIS Complete") {
	assignTask("GIS Update", "AA_GIS");
	}

if (wfTask == "Issuance" && wfStatus == "Issued" && AInfo['developmentTypeOther'] == "ADOPT A ROADWAY") {
	editAppSpecific("permitExpiration", dateAddMonths(null, 24));
	}

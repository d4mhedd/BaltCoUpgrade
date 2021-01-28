//WTUA;Site!Sewer Connection Permit!NA!NA
if (wfTask == "Invoicing" && wfStatus == "No Additional Fees Required") {
	closeTask("Issuance","Issued","Application successfully submitted","Closed via script");
	}

if (wfTask == "Invoicing" && wfStatus == "No Additional Fees Required") {
	closeTask("Close Out","Final","Application successfully submitted","Closed via script");
	}

if (wfTask == "Invoicing" && wfStatus == "No Additional Fees Required") {
	addStdCondition("General", "Record Locked");
	}

if (wfTask == "Invoicing" && wfStatus == "No Additional Fees Required" && balanceDue <= 0) {
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_SEWER_CONN_PERMIT_TO_APPLICANT", "Applicant", "Sewer Connection Permit", "SITE");
	}

if (wfTask == "Close Out" && wfStatus == "Final") {
	editAppSpecific("connectionType","Permit Validated");
	}

if (wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	UTILITYMODULE.sendApplicationStatusUpdateEmail(capId, capStatus, null);
	}

if (envName == "LPMPROD" && wfTask == "Issuance" && wfStatus == "Issued") {
	jurisdictionEmail = APO_FUNCTIONS.getJurisdictionEmail(capId);
	if (jurisdictionEmail != null) SEWER_CONNECTION_FUNCTIONS.sendPermitAsync(jurisdictionEmail);
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask == "Issuance" && wfStatus == "Issued" && balanceDue <= 0) {
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_SEWER_CONN_PERMIT_TO_APPLICANT", "Applicant", "Sewer Connection Permit", "SITE");
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_NOTICE OF ADMIN REVIEW DEFICIENCY", "Applicant", "Notice of Admin Review Deficiency", "SITE");
	}

if (wfTask == "Review Consolidation" && wfStatus=="Denied") {
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_APPLICATION_STATUS", "Applicant", "Notice of Application Denial", "SITE");
	}

if (wfTask == "Review Consolidation" && wfStatus=="Request for Corrections") {
	UTILITYMODULE.sendApplicationStatusUpdateEmail(capId, capStatus, "Notice of Request for Corrections");
	}

if (wfTask == "Review Consolidation" && wfStatus == "Request for Corrections") {
	setTask("Application Intake", "Y", "N");
	setTask("Review Consolidation", "N", "Y");
	}

if (wfTask == "Routing" && wfStatus == "In Review") {
	updateTaskDepartment("Review Consolidation", "PIMA/DSD/NA/NA/NA/NA/NA");
	}

if (wfTask == "Routing" && wfStatus == "In Review" && AInfo['IWC Review'] == "CHECKED") {
	UTILITYMODULE.sendIWCemail(capId);
	}


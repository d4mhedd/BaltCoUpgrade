//PRA;Site!Sewer Connection Permit!NA!NA
if (envName == "LPMPROD" && balanceDue <= 0 && isTaskActive("Issuance")) {
	jurisdictionEmail = APO_FUNCTIONS.getJurisdictionEmail(capId);
	if (jurisdictionEmail != null) SEWER_CONNECTION_FUNCTIONS.sendPermitAsync(jurisdictionEmail);
	}

if (balanceDue <= 0 && isTaskActive("Issuance")) {
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_SEWER_CONN_PERMIT_TO_APPLICANT", "Applicant", "Sewer Connection Permit", "SITE");
	}

if (balanceDue <= 0 && isTaskActive("Issuance")) {
	updateTask("Issuance", "Issued", "Updated via script", "");
	closeTask("Close Out", "Final", "Updated via script","");
	updateAppStatus("Final", "Updated via script");
	addStdCondition("General", "Record Finaled", capId);
	setTask("Issuance", "N", "Y");
	}



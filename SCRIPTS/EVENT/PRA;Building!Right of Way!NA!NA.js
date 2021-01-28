//PRA;Building!Right of Way!NA!NA
if (balanceDue <= 0 && isTaskActive("Issuance") && AInfo['deptPlanReview'] == "DSD") {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if (feeBalance("TR0061") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("TR0061", "INVOICED")) {
	ROWMODULE.performRenewalProcessing(capId);
	}

if (balanceDue <= 0 && isTaskActive("Issuance")) {
	var expDays = ROWMODULE.getExpirationDays(capId);
	editAppSpecific("permitExpiration",dateAdd(null,expDays));
	}

if (balanceDue <= 0 && isTaskActive("Issuance") && AInfo['developmentTypeOther'] == "ADOPT A ROADWAY") {
	editAppSpecific("permitExpiration", dateAddMonths(null, 24));
	}

if (balanceDue <= 0 && isTaskActive("Issuance")) {
	closeTask("Issuance","Issued","WF updated via Line 10 in PRA:Building/Right of Way/NA/NA","Line 10 in PRA:Building/Right of Way/NA/NA");
	ROWMODULE.sendPermitAsync();
	comment("Send Permit Async");
	}

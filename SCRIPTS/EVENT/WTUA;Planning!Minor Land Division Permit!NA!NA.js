//WTUA;Planning!Minor Land Division Permit!NA!NA
if (wfTask == "Issuance" && matches(wfStatus, "Issued", "Permit/Acknowledgement Issued")) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

MINOR_LAND_DIVISION_FUNCTIONS.checkWorkFlowAfter();


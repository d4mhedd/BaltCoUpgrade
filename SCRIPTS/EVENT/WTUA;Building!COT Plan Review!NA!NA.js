//WTUA;Building!COT Plan Review!NA!NA
if ((wfTask == "Invoicing") && (wfStatus == "Void")) {
	updateAppStatus("Void", "Script");
	closeTask("Close Out", "Void", "Updated Via Script", null);
	addStdCondition("General", "Record Locked", capId);
	}

if ((wfTask == "Invoicing") && (wfStatus == "Assess Fees")) {
	comment("Assessing Fees");
	COTMODULE.assessFees(capId);
	}

if ((wfTask == "Invoicing") && (wfStatus == "Invoice Fees")) {
	COTMODULE.sendPermitAsync(AInfo['periodStart'],AInfo['periodEnd']);
	}
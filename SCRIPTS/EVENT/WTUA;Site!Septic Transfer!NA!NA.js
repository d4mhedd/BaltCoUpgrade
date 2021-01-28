//WTUA;Site!Septic Transfer!NA!NA
if (wfTask == "Close Out" && matches(wfStatus, "Issued", "Denied")) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if (wfTask == "Review" && matches(wfStatus, "Approved", "Denied")) {
	branch("EMSE:InvoiceFeeNotification");
	}


//ASA;DEQ!OP!Compliance!NA
UTILITYDEQMODULE.setWSTContactAttributes(capId);
if ((AInfo['Compliance Type'] == "Report")) {
	branchTask("Action Created","Report","Application successfully submitted","Closed via script");
	setTask("Report","Y","N");
	setTask("Close Out","N","N");
	updateAppStatus("Report","Set by script");
	assignTask("Report", currentUserID);
	}

if ((AInfo['Compliance Type'] == "Notification")) {
	closeTask("Action Created","Review","Application successfully submitted","Closed via script");
	updateAppStatus("Review","Set by script");
	assignTask("Review", currentUserID);
	}

if ((AInfo['Compliance Type'] == "Inspection")) {
	closeTask("Action Created","Inspection","Application successfully submitted","Closed via script");
	removeTask(capId,"Review");
	setTask("Inspection","Y","N");
	updateAppStatus("Inspection","Set by script");
	assignTask("Inspection", currentUserID);
	}

if (capName !=null) {
	editAppName(AInfo['Compliance Type'] + " - " + AInfo['Compliance Subtype'] + " - " + AInfo['Due Date'] + " - " + capName);
	}

if (capName == null) {
	editAppName(AInfo['Compliance Type'] + " - " + AInfo['Compliance Subtype'] + " - " + AInfo['Due Date']);
	}

UTILITYDEQMODULE.validateContact(capId, true);
FINANCIAL_INTERFACE_DEQ.setAllUnInvoicedDEQFeeNotes(capId);

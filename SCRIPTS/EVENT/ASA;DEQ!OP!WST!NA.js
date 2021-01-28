//ASA;DEQ!OP!WST!NA
closeTask("Application Submittal","Submitted","Application successfully submitted","Closed via script");
assignTask("Technical Review", currentUserID);
updateAppStatus("Technical Review","Automatic");
UTILITYDEQMODULE.setWSTContactAttributes(capId);
if (capName !=null) {
	editAppName(AInfo['newOrRenewal'] + " - " + capName);
	}

if (capName == null) {
	editAppName(AInfo['newOrRenewal']);
	}

UTILITYDEQMODULE.assessWSTfee(capId);
UTILITYDEQMODULE.validateContact(capId, false);
FINANCIAL_INTERFACE_DEQ.setAllUnInvoicedDEQFeeNotes(capId);
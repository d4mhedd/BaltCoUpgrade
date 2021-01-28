//ASA;DEQ!OP!WTRPW!NA
closeTask("Application Submittal","Submitted","Application successfully submitted","Closed via script");
updateAppStatus("Source Process","Automatic");
UTILITYDEQMODULE.setWSTContactAttributes(capId);
if (capName !=null) {
	editAppName(AInfo['newOrRenewal'] + " - " + capName);
	}

if (capName == null) {
	editAppName(AInfo['newOrRenewal']);
	}

UTILITYDEQMODULE.invoiceFeesWTRPW(capId);
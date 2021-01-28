//IRSA;Building!DamageDemo!NA!NA
var params = new Object();
params.applicationNumber = capId;
if (inspResult == "Fail - Re-Inspection Fee") {
	branch("EMSE:InvoiceFeeNotification");
	}

if (matches(inspResult, "Pass", "Partial")) {
	editAppSpecific("permitExpiration", dateAddMonths(null,12));
	}

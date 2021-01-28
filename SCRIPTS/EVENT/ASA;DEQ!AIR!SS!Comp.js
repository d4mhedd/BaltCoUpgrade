//ASA;DEQ!AIR!SS!Comp
if (capName!=null) {
	editAppName(AInfo['complianceType'] + " - " + AInfo['complianceSubtype'] + " - " + capName);
	} else {
	editAppName(AInfo['complianceType'] + " - " + AInfo['complianceSubtype']);
	}

updateAppStatus("Review Data","In Progress");
closeTask("Action Created","Complete","Application successfully submitted","Closed via script");

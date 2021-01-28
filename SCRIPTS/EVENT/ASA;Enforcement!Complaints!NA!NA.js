//ASA;Enforcement!Complaints!NA!NA
closeTask("Intake","Submitted","Auto-Submit","","CI_COMPLAINTS");
if ((AInfo['timeReceived'] == "" || AInfo['timeReceived'] == null || typeof AInfo['timeReceived'] == "undefined")) {
	editAppSpecific("timeReceived",UTILITYMODULE.getASITimeString(new Date()));
	}
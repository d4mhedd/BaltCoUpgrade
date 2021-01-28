//ASA;Site!Sewer Waiver Request!NA!NA
setTask("Application Intake","N","Y");
setTask("Review","Y","N");
updateAppStatus("In Review","auto-submit");
if (AInfo['numWaivers'] != null) {
	addFee("DE0011","SEPTIC WAIVER","FINAL", AInfo['numWaivers'], "Y");
	}

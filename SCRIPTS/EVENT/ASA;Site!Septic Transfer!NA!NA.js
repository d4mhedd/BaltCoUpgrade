//ASA;Site!Septic Transfer!NA!NA
setTask("Application Intake","N","Y");
setTask("Review","Y","N");
updateAppStatus("In Review","auto-submit");
if (publicUser == false) {
	addFee("DE0015","SEPTIC TRANSFER","FINAL", 1 ,"Y");
	}
	
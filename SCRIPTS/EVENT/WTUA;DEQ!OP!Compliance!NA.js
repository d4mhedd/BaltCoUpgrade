//WTUA;DEQ!OP!Compliance!NA
if ((wfTask == "Action Created" && wfStatus == "Withdrawn")) {
	closeTask("Action Created","Close Out","Application successfully submitted","Closed via script");
	removeTask(capId,"Review");
	setTask("Close Out","Y","N");
	updateAppStatus("Close Out","Set by script");
	}

if (wfTask == "Report" && wfStatus == "Batch Pending" && AInfo['Compliance Type'] == "Report" && AInfo['Compliance Subtype'] == "WSTSH Quarterly") {
	aa.sendEmail(sysFromEmail,lookup("DEQ_PERIODIC_BATCH_EMAIL_CONTACTS",appTypeString),null,"Execute batch job","Please execute the DEQ OP-COMP Creation batch job.",null);
	}


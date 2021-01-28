//WTUA;DEQ!AIR!SS!COMP
if (wfStatus == "In Progress") {
	updateAppStatus("In Progress", "Automatic");
	}

if (wfTask == "Review Data" && wfStatus=="Reminder Letter Sent") {
	editTaskDueDate("Review Data",dateAdd(null,10));
	}

if (wfTask == "Compliance" && wfStatus=="Opportunity to Correct") {
	editTaskDueDate("Compliance",dateAdd(null,30));
	}

if (wfTask == "Action Complete" && AInfo['recurring'] == "Yes") {
	var newCapId = createCap("DEQ/AIR/SS/Comp", null);
	editAppSpecific("complianceType", getAppSpecific("complianceType", capId), newCapId);
	editAppSpecific("complianceSubtype", getAppSpecific("complianceSubtype", capId), newCapId);
	editAppName(capName, newCapId);
	editAppSpecific("recurring", "Yes", newCapId);
	editAppSpecific("dueDate", AInfo['Next Due Date'] , newCapId);
	copyContacts(capId, newCapId);
	var compType = getAppSpecific("complianceType", capId);
	var recordType = compType.substring(0,1);
	UTILITYDEQMODULE.setRecordId(recordType, newCapId);
	updateAppStatus("New","Automatic", newCapId);
	UTILITYDEQMODULE.editTaskDueDateForCapId("Action Created", AInfo['Next Due Date'], newCapId);
	}

if ((wfTask == "Action Created" && wfStatus == "Withdrawn")) {
	closeTask("Action Created","Close Out","Application successfully submitted","Closed via script");
	removeTask(capId,"Review");
	setTask("Close Out","Y","N");
	updateAppStatus("Close Out","Set by script");
	}

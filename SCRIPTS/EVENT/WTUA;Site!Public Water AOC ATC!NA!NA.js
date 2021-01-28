//WTUA;Site!Public Water AOC ATC!NA!NA
if (wfTask == "Review" && wfStatus == "Request for Corrections") {
	setTask("Review","N","Y");
	setTask("Application Intake","Y","N");
	updateAppStatus("Request for Corrections","Workflow tool limitation workaround");
	}

if (wfTask == "Approval to Construct" && wfStatus == "Issue ATC") {
	editAppSpecific("permitExpiration",dateAdd(null,1095));
	}



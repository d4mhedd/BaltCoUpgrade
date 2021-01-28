//WTUA;Planning!Specific Plan!NA!NA
if (wfTask=="BOS Hearing"&& wfStatus=="Refer to P & Z") {
	closeTask("BOS Hearing", "Refer to P & Z","Closed via script","");
	closeTask("Close Out","Withdrawn","Closed via Script", "");
	deactivateTask("Ordinance");
	activateTask("Staff Report");
	deactivateTask("BOS Staff Report");
	}

if (wfTask=="BOS Hearing"&& wfStatus=="Denied") {
	closeTask("BOS Hearing", "Denied","Closed via script","");
	deactivateTask ("BOS Staff Report");
	activateTask("Close Out");
	}

if (wfTask=="BOS Hearing"&& wfStatus=="Withdrawn") {
	closeTask("BOS Hearing", "Withdrawn","Closed via script","");
	deactivateTask ("BOS Staff Report");
	activateTask("Close Out");
	}

if (wfTask=="Review Consolidation" && wfStatus=="Withdrawn") {
	closeTask("Review Consolidation", "Withdrawn","Closed via script","");
	activateTask("Close Out");
	deactivateTask("P and Z Hearing");
	deactivateTask("BOS Staff Report");
	deactivateTask("Staff Report");
	deactivateTask("Routing");
	}

if (wfTask=="Notification" && wfStatus=="Not Required") {
	closeTask("Legal Ad", "Not Required","Closed via script","");
	closeTask("Mailed Notice","Not Required","Closed via Script", "");
	closeTask("Posted Sign","Not Required","Closed via Script", "");
	deactivateTask("Legal Ad");
	deactivateTask("Mailed Notice");
	deactivateTask("Posted Sign");
	deactivateTask("Notification");
	deactivateTask("Routing");
	}


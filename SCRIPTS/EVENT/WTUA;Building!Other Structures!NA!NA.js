//WTUA;Building!Other Structures!NA!NA
if (wfTask=="Inspection" && wfStatus=="Revisions") {
	closeTask("Inspection", "Revisions", "Closed via script", "");
	openTask("Admin Review", ""), "Closed via script", "");
	deactivateTask("Inspection");
	}

if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.assessOtherStructuresFee();
	FEE_UTILS_MODULE.assessSignFees();
	DEV_ACCELA_ENG_1.doubleFees();
	}

if (wfTask == "Routing" && wfStatus == "In Review" && AInfo['IWC Review'] == "CHECKED") {
	UTILITYMODULE.sendIWCemail(capId);
	}
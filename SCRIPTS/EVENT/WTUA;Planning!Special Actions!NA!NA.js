//WTUA;Planning!Special Actions!NA!NA
if (wfTask=="BOS Hearing" && wfStatus=="Refer to P & Z") {
	closeTask("BOS Hearing","Refer to P & Z","Closed via Script","");
	activateTask("Staff Report");
	deactivateTask("BOS Staff Report");
	deactivateTask("Resolution");
	}

if (wfTask=="Notification" && wfStatus=="Notification Not Required") {
	closeTask("Legal Ad", "Not Required","Closed via script","");
	closeTask("Notice Mailed","Not Required","Closed via Script", "");
	closeTask("Posted Sign","Not Required","Closed via Script", "");
	deactivateTask("Legal Ad");
	deactivateTask("Mailed Notice");
	deactivateTask("Posted Sign");
	deactivateTask("Notification");
	deactivateTask("Routing");
	}

if (wfTask=="Staff Report"&&wfStatus=="Withdrawn") {
	closeTask("Staff Report", "Withdrawn","Closed via script","");
	activateTask("Close Out");
	deactivateTask("P and Z Hearing");
	}

if (wfTask == "Review Consolidation" && wfStatus == "Assess Fees" && AInfo['timeExtension'] == "CHECKED" && feeExists("DS0021","INVOICED","NEW")) {
	showMessage=true;
	comment("Fees have already been assessed.");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Assess Fees" && AInfo['timeExtension'] == "CHECKED" && !feeExists("DS0021","INVOICED","NEW"))) {
	FEE_UTILS_MODULE.addSpecialActionFees();
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Assess Fees" && AInfo['timeExtension'] == "CHECKED" && !feeExists("DS0021","INVOICED","NEW"))) {
	FEE_UTILS_MODULE.SASpecialActionFees();
	}

if (wfTask=="Routing" && wfStatus=="In Review") {
	reviewTasks = ["DSD - Planning","DEQ","DOT","RWRD","OSC - Cultural Resources","RFCD","NRPR","OSC - Environmental Planning","Assessors Office","Housing and Community Development"];
	for(x in reviewTasks) editTaskDueDate(reviewTasks[x], dateAdd(null,10,"Y"));
	}


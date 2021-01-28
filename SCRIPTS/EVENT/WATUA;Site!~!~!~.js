//WATUA;Site!~!~!~
if (matches(appTypeArray[1],"Development Concept Permit","Site Construction","Site Construction Building") && wfTask == "Renewal" && wfStatus == "Extend App - No Fee") {
	DEV_ACCELA_ENG_1.completeRenewalNoFee();
	}

if (wfTask=="Connect Records and Conditions" && wfStatus=="Relate Record and Pull Conditions") {
	addParent(""+AInfo['Parent Record Number']);
	DEV_LYNDA_WACHT.processConditions(AInfo['Parent Record Number'], capId);
	}

if (wfTask=="Ad Hoc Task Launcher" && wfStatus=="Launch Task") {
	branch("EMSE:AdHocTaskLauncher");
	}

if (wfTask=="Ad Hoc GIS" && wfStatus=="Send to GIS") {
	assignTask("Ad Hoc GIS","AA_GIS");
	}

if (wfTask=="Ad Hoc GIS" && wfStatus=="Send to Record Dept") {
	assignTask("Ad Hoc GIS","AA_DSD_Site");
	updateTaskDepartment("Ad Hoc GIS", lookup("REPORT_CONFIG", cap.getCapType().getAlias() + "|DepartmentContact"));
	}

if (wfTask=="Renewal" && wfStatus=="Invoice Fees") {
	branch("EMSE:InvoiceFeeNotification");
	}

if (matches(appTypeArray[1],"Development Concept Permit","Site Construction","Site Construction Building", "Tentative Plat","Final Plat") && wfTask == "DSD Invoicing" && wfStatus == "Invoice Fees") {
	branch("EMSE:InvoiceFeeNotification");
	}

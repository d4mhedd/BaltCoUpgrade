//WATUA;Planning!~!~!~
if (wfTask=="Connect Records and Conditions" && wfStatus=="Relate Record and Pull Conditions") {
	addParent(""+AInfo['Parent Record Number']);
	DEV_LYNDA_WACHT.processConditions(AInfo['Parent Record Number'], capId);
	}

if (wfTask=="Ad Hoc Task Launcher" && wfStatus=="Launch Task") {
	branch("EMSE:AdHocTaskLauncher");
	}

if (wfTask=="Ad Hoc GIS" && wfStatus=="Send to Record Dept") {
	assignTask("Ad Hoc GIS","AA_DSD_Planning");
	updateTaskDepartment("Ad Hoc GIS", lookup("REPORT_CONFIG", cap.getCapType().getAlias() + "|DepartmentContact"));
	}

if (wfTask=="Ad Hoc GIS" && wfStatus=="Send to GIS") {
	assignTask("Ad Hoc GIS","AA_GIS");
	}
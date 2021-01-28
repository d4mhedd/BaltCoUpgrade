//WATUA;Building!S10 Certificate of Coverage!NA!NA
if (wfTask == "Ad Hoc Section 10") {
	updateAppStatus(wfStatus, wfComment, capId);
	}

if (wfTask=="Ad Hoc GIS" && wfStatus=="Send to Record Dept") {
	assignTask("Ad Hoc GIS","AA_OSC_S10CC");
	updateTaskDepartment("Ad Hoc GIS", lookup("REPORT_CONFIG", cap.getCapType().getAlias() + "|DepartmentContact"));
	}

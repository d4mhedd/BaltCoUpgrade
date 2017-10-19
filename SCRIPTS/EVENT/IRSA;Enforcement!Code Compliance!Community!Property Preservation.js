//DLH 171012 conversion begin

if ((inspResult == "Approved" && inspType == "Preservation Inspection" && isTaskActive("Case Status"))) {
	updateTask("Case Status", "Approved", "Updated by Script", "");
	}

if ((inspResult == "Denied" && inspType == "Preservation Inspection" && isTaskActive("Case Status"))) {
	updateTask("Case Status", "Denied", "Updated by Script", "");
	}
	
//DLH 171012 conversion end
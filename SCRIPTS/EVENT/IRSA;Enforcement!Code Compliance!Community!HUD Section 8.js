//DLH 171012 conversion begin

if ((inspResult == "Approved" && isTaskActive("Case Status"))) {
	closeTask("Case Status", "Approved", "Updated by Script", "");
	}

if ((inspResult == "Denied"  && isTaskActive("Case Status"))) {
	updateTask("Case Status", "Denied", "Updated by Script", "");
	}
	
//DLH 171012 conversion end
//DLH 171012 conversion begin

//PRA;Enforce!Animal Control!Services!NA
if (balanceDue == 0) {
	closeTask("Service","Completed","Closed via scripted payment");
	}
if (capStatus == "Online Submittal" && appMatch("Enforce/Animal Control/Complaints/NA")) {
	updateAppStatus("Pending");
	}
	
//DLH 171012 conversion end
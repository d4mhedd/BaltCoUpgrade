//DLH 171012 conversion begin

if ((inspResult == "Complete" && inspType=="Letters Mailed")) {
	closeTask("Notification Letters", "Yes", "Updated by Script", "","CZMP PROCESS");
	}

if ((inspResult == "Complete" && inspType=="Agency Comments")) {
	closeTask("Agency Comments", "Yes", "Updated by Script", "","CZMP PROCESS");
	}

if ((inspResult == "Complete" && inspType=="Sign Posted")) {
	closeTask("Sign Posting", "Yes", "Updated by Script", "","CZMP PROCESS");
	}

if ((inspResult == "Complete" && inspType=="Schedule Planner for Internal Review")) {
	closeTask("Internal Review", "Complete", "Updated by Script", "");
	}

if ((inspResult == "Complete" && inspType=="DP Recommendations")) {
	closeTask("DP Recommendations", "Yes", "Updated by Script", "","CZMP PROCESS");
	}

if ((inspResult == "Complete" && inspType=="Planning Board")) {
	closeTask("Planning Board", "Yes", "Updated by Script", "","CZMP PROCESS");
	}

if ((inspResult == "Complete" && inspType=="County Council")) {
	closeTask("County Council", "Yes", "Updated by Script", "","CZMP PROCESS");
	}
	
//DLH 171012 conversion end
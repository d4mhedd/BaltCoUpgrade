//WATUA;DEQ!AIR!SS!RevTerm
if (wfTask=="Appeal" && wfStatus=="In Progress") {
	updateAppStatus("Appeal in Progress", "By Adhoc Appeal task");
	}

if (wfTask == "Appeal" && wfStatus == "Upheld") {
	updateAppStatus("Appeal Upheld","Appeal task status");
	}

if (wfTask == "Appeal" && wfStatus == "Denied") {
	updateAppStatus("Appeal Denied","Denied task status");
	}

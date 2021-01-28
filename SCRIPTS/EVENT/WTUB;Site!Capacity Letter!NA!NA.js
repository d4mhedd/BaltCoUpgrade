//WTUB;Site!Capacity Letter!NA!NA
if (cancel == false && wfTask == "Issuance" && wfStatus == "Issued" && AInfo['waiver'] == "CHECKED") {
	var params = aa.util.newHashMap();
	WFMODULE.displayReportFromWorkflow("Capacity Letter Waiver", params);
	}

if (cancel == false && wfTask == "Review" && wfStatus == "Denied" && AInfo['waiver'] == "CHECKED") {
	var params = aa.util.newHashMap();
	WFMODULE.displayReportFromWorkflow("Notice of Application Denial", params);
	}

if (cancel == false && (wfTask == "Issuance" && wfStatus == "Issued" || wfTask == "Review" && wfStatus == "Denied") && (AInfo['capacityLetterType'] == "Type I" || AInfo['capacityLetterType'] == "Type II") && AInfo['waiver'] == null) {
	var params = aa.util.newHashMap();
	WFMODULE.displayReportFromWorkflow("Capacity Letter", params);
	}


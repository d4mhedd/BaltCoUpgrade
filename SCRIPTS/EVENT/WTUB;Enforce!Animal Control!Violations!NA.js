if ((wfTask == "Violation Initiated" && wfStatus == "Board of Appeals Requested") && capStatus == "AHB Upheld" && (AInfo["AHB Upheld 30 Days"] < dateAdd(null,0))) {
	showMessage=true;
	comment("The Board of Appeals request has been denied as it has been longer than 30 days since the Appeal to the Animal Hearing Board was upheld.");
	cancel = true;
	}
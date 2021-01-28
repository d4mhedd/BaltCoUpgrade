//ASA;DEQ!AP!OpenBurn!NA
if (AInfo['burnType'] == "Residential" && !feeExists("RESBASE") && !feeExists("RESDAY")) {
	addFee("RESBASE","DE_AP_OPENBURN","FINAL",1,"Y");
	addFee("RESDAY","DE_AP_OPENBURN","FINAL",AInfo['numDays'],"Y");
	}

if (AInfo['burnType'] != "Residential" && !feeExists("CONAGBASE") && !feeExists("CONAGDAY")) {
	addFee("CONAGBASE","DE_AP_OPENBURN","FINAL",1,"Y");
	addFee("CONAGDAY","DE_AP_OPENBURN","FINAL",AInfo['numDays'],"Y");
	}

closeTask("Application Submittal","Complete", "Auto-submit", "Closed via script" );
updateAppStatus("Pay Fees","Automatic");
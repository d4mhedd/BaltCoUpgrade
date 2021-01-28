//WTUA;DailyDeposit!Development Services!NA!NA
if (wfTask == "Run Interface") {
	var isTrialMode = wfStatus == "Trial" ? true : false;
	FINANCIALINTERFACEMODULE.runCRJVFinancialInterface(capId,currentUserID,isTrialMode,AInfo['startDate'],AInfo['endDate'],"DSD");
	}

if (wfTask == "Run Interface" && wfStatus == "Live") {
	editAppSpecific("datesLocked","Yes");
	}

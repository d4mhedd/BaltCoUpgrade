//WTUA;DailyDeposit!Environmental Quality!NA!NA
if (wfTask == "Run Interface") {
	var isTrialMode = wfStatus == "Trial" ? true : false;
	FINANCIALINTERFACEMODULE.runCRJVFinancialInterface(capId,currentUserID,isTrialMode,AInfo['startDate'],AInfo['endDate'],"DE");
	}

if (wfTask == "Run Interface" && wfStatus == "Live") {
	editAppSpecific("datesLocked","Yes");
	}

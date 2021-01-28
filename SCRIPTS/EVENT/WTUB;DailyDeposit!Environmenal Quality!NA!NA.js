//WTUB;DailyDeposit!Environmenal Quality!NA!NA
var dateCheckResult = FINANCIALINTERFACEMODULE.checkDates(AInfo['startDate'],AInfo['endDate']);
if (wfTask == "Run Interface" && (wfStatus == "Live" || wfStatus == "Trial") && (dateCheckResult !=null)) {
	cancel=true;
	showMessage=true;
	comment("<font color='red'>"+dateCheckResult+"</font>");
	}

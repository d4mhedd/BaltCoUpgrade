//ASA;DEQ!AP!NESHAP!NA
closeTask("Application Submittal","Complete","Application successfully submitted","Complete via script");
updateAppStatus("Pay Fees","auto-submit");
var specialCondition = AInfo['specialCase'];
var prefix = "";
if (specialCondition != null && specialCondition != undefined) prefix = specialCondition.substring(0,1) + ": ";
editAppName(prefix + AInfo['typeOfChange'] + ": " + AInfo['startDate'] + " - " + AInfo['endDate']);
var justNotify = AInfo['notification'];
if ((!feeExists("DE_APN_DNR")  && justNotify != "CHECKED")) {
	addFee("DE_APN_DNR","DE_AP_NESHAP","FINAL", 1 ,"Y");
	}

if (UTILITYDEQMODULE.isDateAfter(AInfo['startDate'], 14, 1) == false) {
	addStdCondition("Associated Conditions","EQ0010");
	}

//CTRCA;DEQ!AP!NESHAP!NA
closeTask("Application Submittal","Complete","Application successfully submitted","Complete via script");
updateAppStatus("Pay Fees","auto-submit");
var specialCondition = AInfo['specialCase'];
var prefix = "";
if (specialCondition != null && specialCondition != undefined) prefix = specialCondition.substring(0,1) + ": ";
editAppName(prefix + AInfo['typeOfChange'] + ": " + AInfo['startDate'] + " - " + AInfo['endDate']);

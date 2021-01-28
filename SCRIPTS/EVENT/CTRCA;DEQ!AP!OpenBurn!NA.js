//CTRCA;DEQ!AP!OpenBurn!NA
closeTask("Application Submittal","Complete", "Auto-submit", "Closed via script" );
updateAppStatus("Pay Fees","Automatic");
editAppName(AInfo['burnType'] + " - " + AInfo['startDate'] + " - " + AInfo['numDays'] + " Days");

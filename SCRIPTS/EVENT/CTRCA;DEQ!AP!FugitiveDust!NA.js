//CTRCA;DEQ!AP!FugitiveDust!NA
closeTask("Application Submittal","Complete", "Auto-submit", "Closed via script" );
updateAppStatus("Pay Fees","Automatic");
if (AInfo['multiActivityPermit'] == "Yes") {
	editAppName("Multi: " + AInfo['startDate'] + " - " + AInfo['endDate']);
	}

if (AInfo['multiActivityPermit'] == "No") {
	editAppName("Individual: " + AInfo['startDate'] + " - " + AInfo['endDate']);
	}
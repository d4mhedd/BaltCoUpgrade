//CTRCA;Site!Sewer Connection Permit!~!~
closeTask("Application Intake","Complete", "Auto-submit", "Closed via script" );
updateAppStatus("Submitted","Automatic");
if (true) {
	editAppName("SWR_" + APO_FUNCTIONS.getParcelLegalDescription(capId));
	}

if (true) {
	SEWER_CONNECTION_FUNCTIONS.AddingMeterASITEntry(capId);
	}
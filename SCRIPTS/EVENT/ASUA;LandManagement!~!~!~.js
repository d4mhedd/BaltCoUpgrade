//DLH 171012 conversion begin

if (appStatus == "Abandoned") {
	taskCloseAllExcept("Abandoned","Closed via Scripted update to Application Status","");
	}

if (appStatus == "Withdrawn") {
	taskCloseAllExcept("Withdrawn","Closed via Scripted update to Application Status","");
	}
	
//DLH 171012 conversion end
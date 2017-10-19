//DLH 171012 conversion begin

if (AInfo["Admin Resolved"] == "Yes") {
	assignCap("SMONTGOMERY");
	assignTask("Investigation Status","SMONTGOMERY");
	}

if (currentUserGroup != "EnforcePublicUser" &&AInfo["Admin Resolved"]=="No") {
	scheduleInspection("Initial",0,"NEXTRAQ");
	}

if (currentUserID == "BALTCOGO") {
	editChannelReported("Online");
	}

if (currentUserID == "BALTCOGO") {
	updateAppStatus("Online Submittal");
	}

//DLH 171012 conversion end
//DLH 171012 conversion begin

if (currentUserGroup != "EnforcementPublicUser") {
	activateTask("Hearing Status");
	updateTask("Inspection Status", "Citation Issued", "Updated by Script", "");
	}

//DLH 171012 conversion end
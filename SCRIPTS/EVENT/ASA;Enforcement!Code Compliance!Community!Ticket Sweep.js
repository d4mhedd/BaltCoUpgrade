//DLH 171012 conversion begin

if (currentUserGroup != "EnforcementPublicUser") {
	updateTask("Inspection Status", "Citation Issued", "Updated by Script", "");
	}

emailContact("Baltimore County Code Enforcement","Thank you for submitting your Ticket Sweep Application. Your Transaction Number is " + capIDString + ".This is a system generated email. DO NOT REPLY.","Complainant");

//DLH 171012 conversion end
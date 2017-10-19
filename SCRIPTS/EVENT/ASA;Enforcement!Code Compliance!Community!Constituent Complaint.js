//DLH 171012 conversion begin

if ((publicUser == false && currentUserID != "BALTCOGO")) {
	scheduleInspectDate("Initial Inspection",nextWorkDay(),null, null, "Scheduled via Application Submittal");
	closeTask("Intake","Inspection Scheduled","Closed via Application Submittal");
	}

if ((publicUser == false && currentUserID != "BALTCOGO")) {
	emailContact("Baltimore County Code Enforcement","Thank you for submitting your complaint. Your tracking number is " + capIDString + ". Your concerns will be investigated as soon as possible. If a violation exists, corrective action will be taken. You will receive an email whenever the status of your complaint changes.<br/><br/>You may obtain additional information at www.baltimorecountymd.gov/agencies/permits/codeenforcement or by searching existing complaints.<br/><br/>This is an automated email notification. Do not reply.","Complainant");
	}

if (currentUserID == "BALTCOGO") {
	aa.runScript("ADDRESSDUPLICATEFORACA");
	editChannelReported("Online");
	}

//DLH 171012 conversion end
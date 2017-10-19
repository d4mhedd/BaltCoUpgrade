//DLH 171012 conversion begin

if (currentUserGroup != "EnforcementPublicUser") {
	scheduleInspectDate("Initial Inspection",sysDateMMDDYYYY,currentUserID, null, "Scheduled via Application Submittal");
	closeTask("Intake","Inspection Scheduled","Closed via Application Submittal");
	}

emailContact("Baltimore County Code Enforcement","Thank you for submitting your complaint. Your tracking number is " + capIDString + ". Your concerns will be investigated as soon as possible. If a violation exists, corrective action will be taken. You will receive an email whenever the status of your complaint changes.<br/><br/>You may obtain additional information at www.baltimorecountymd.gov/agencies/permits/codeenforcement or by searching existing complaints.<br/><br/>This is an automated email notification. Do not reply.","Complainant");

//DLH 171012 conversion end
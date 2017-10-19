//DLH 171012 conversion begin

if (wfTask == "Applicant Meeting" && wfStatus == "Complete") {
	scheduleInspectDate("Letters Mailed",nextWorkDay(),null, null, "Scheduled via Workflow");
	}

if (wfTask == "Applicant Meeting" && wfStatus == "Complete") {
	scheduleInspectDate("Sign Posted",nextWorkDay(),null, null, "Scheduled via Workflow");
	}

if (wfTask == "Applicant Meeting" && wfStatus == "Complete") {
	scheduleInspectDate("Agency Comments",nextWorkDay(),null, null, "Scheduled via Workflow");
	}

if (wfTask == "Applicant Meeting" && wfStatus == "Complete") {
	scheduleInspectDate("DP Recommendations",nextWorkDay(),null, null, "Scheduled via Workflow");
	}

if (wfTask == "Applicant Meeting" && wfStatus == "Complete") {
	scheduleInspectDate("Planning Board",nextWorkDay(),null, null, "Scheduled via Workflow");
	}

if (wfTask == "Applicant Meeting" && wfStatus == "Complete") {
	scheduleInspectDate("County Council",nextWorkDay(),null, null, "Scheduled via Workflow");
	}

if (wfStatus=="Closed") {
	closeTask("Closure", "Closed", "Closed by Script", "");
	}

if (wfStatus=="Void") {
	closeTask("Internal Review", "Void", "Closed by Script", "");
	closeTask("Applicant Meeting", "Void", "Closed by Script", "");
	closeTask("Process Issue", "Void", "Closed by Script", "");
	closeTask("Intake", "Void", "Closed by Script", "");
	}

if (wfTask == "Process Issue" && wfStatus == "Complete") {
	closeTask("Closure", "Complete", "Closed by Script", "");
	}

if ((wfTask=="Applicant Meeting" && wfStatus=="Complete")) {
	email("dthomas@baltimorecountymd.gov","CZMP2016@baltimorecountymd.gov","New CZMP 2016 issue is available for review","The following new issue has been created and is available for your review and comments.<br/><br/><b>Tracking Number:</b><br/>" + capIDString +"<br/><br/><b>Issue Number:</b><br/>"+ capName + "<br/><br/>The GIS boundary layer will be available to view after the next scheduled GIS production update.<br/><br/><b>This is an automated email notification. Do not reply.</b>");
	}

if ((wfTask=="Applicant Meeting" && wfStatus=="Complete")) {
	email("dlykens@baltimorecountymd.gov","CZMP2016@baltimorecountymd.gov","New CZMP 2016 issue is available for review","The following new issue has been created and is available for your review and comments.<br/><br/><b>Tracking Number:</b><br/>" + capIDString +"<br/><br/><b>Issue Number:</b><br/>"+ capName + "<br/><br/>The GIS boundary layer will be available to view after the next scheduled GIS production update.<br/><br/><b>This is an automated email notification. Do not reply.</b>");
	}

if ((wfTask=="Applicant Meeting" && wfStatus=="Complete")) {
	email("trising@baltimorecountymd.gov","CZMP2016@baltimorecountymd.gov","New CZMP 2016 issue is available for review","The following new issue has been created and is available for your review and comments.<br/><br/><b>Tracking Number:</b><br/>" + capIDString +"<br/><br/><b>Issue Number:</b><br/>"+ capName + "<br/><br/>The GIS boundary layer will be available to view after the next scheduled GIS production update.<br/><br/><b>This is an automated email notification. Do not reply.</b>");
	}

if ((wfTask=="Applicant Meeting" && wfStatus=="Complete")) {
	email("cfranklinbush@baltimorecountymd.gov","CZMP2016@baltimorecountymd.gov","New CZMP 2016 issue is available for review","The following new issue has been created and is available for your review and comments.<br/><br/><b>Tracking Number:</b><br/>" + capIDString +"<br/><br/><b>Issue Number:</b><br/>"+ capName + "<br/><br/>The GIS boundary layer will be available to view after the next scheduled GIS production update.<br/><br/><b>This is an automated email notification. Do not reply.</b>");
	}

if ((wfTask=="Applicant Meeting" && wfStatus=="Complete")) {
	email("pmcdougall@baltimorecountymd.gov","CZMP2016@baltimorecountymd.gov","New CZMP 2016 issue is available for review","The following new issue has been created and is available for your review and comments.<br/><br/><b>Tracking Number:</b><br/>" + capIDString +"<br/><br/><b>Issue Number:</b><br/>"+ capName + "<br/><br/>The GIS boundary layer will be available to view after the next scheduled GIS production update.<br/><br/><b>This is an automated email notification. Do not reply.</b>");
	}

if (wfTask == "Intake" && wfStatus == "Complete") {
	scheduleInspectDate("Schedule Planner for Internal Review",dateAdd(null,0),null, null, "Scheduled via Workflow");
	closeTask("Intake","Complete","Closed via Workflow");
	}
	
//DLH 171012 conversion end
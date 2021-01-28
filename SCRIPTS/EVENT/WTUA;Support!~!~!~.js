//WTUA;Support!~!~!~
if ((wfTask == "Account Maintenance" && wfStatus == "Clarification Needed")) {
	var emailParams = [];
	emailParams.workflowComment = wfComment;
	emailParams.userEmail = AInfo['userEmail'];
	emailParams.RecordID=capId.getCustomID();
	UTILITYMODULE.sendSimpleTemplateBasedEmail(capId,AInfo['requestEmail'],sysFromEmail,null,"SU_USERREVISION",emailParams);
	}

if ((wfTask == "Account Maintenance" && wfStatus == "Request Performed")) {
	var emailParams = [];
	emailParams.userEmail = AInfo['userEmail'];
	emailParams.RecordID=capId.getCustomID();
	UTILITYMODULE.sendSimpleTemplateBasedEmail(capId,AInfo['requestEmail'],sysFromEmail,null,"SU_USERSUCCESS",emailParams);
	}

if ((wfTask == "Department Request" && wfStatus == "Withdraw")) {
	setTask("Department Request","N","Y");
	setTask("Close Out","Y","Y");
	addStdCondition("General", "Record Locked", capId);
	updateAppStatus("Closed - Withdrawn","");
	}

if ((wfTask == "Department Request" && wfStatus == "Not Approved")) {
	setTask("Department Request","N","Y");
	setTask("Close Out","Y","Y");
	addStdCondition("General", "Record Locked", capId);
	updateAppStatus("Closed - Not Approved","");
	}

if ((wfTask == "Account Maintenance" && wfStatus == "Request Performed")) {
	setTask("Account Maintenance","N","Y");
	setTask("Close Out","Y","Y");
	addStdCondition("General", "Record Locked", capId);
	updateAppStatus("Closed - Completed","");
	}


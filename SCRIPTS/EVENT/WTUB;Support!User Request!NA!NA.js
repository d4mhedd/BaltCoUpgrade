//WTUB;Support!User Request!NA!NA
var taskApprovedString = "Not set";
taskApproved = false;
certOnRec = true;
sameAsCreate = true;
errorMessage ="";
if ((wfTask == "Account Maintenance" && wfStatus == "Request Performed")) {
	var capMod = aa.cap.getCapViewBySingle(capId);
	var createdBy = capMod.getCreatedBy();
	if (createdBy != currentUserID) sameAsCreate = false;
	}

if ((wfTask == "Account Maintenance" && wfStatus == "Request Performed" && sameAsCreate == true)) {
	errorMessage += br + "The same user cannot create the record and perform the action." + br;
	}

if (wfTask == "User Training") {
	var taskApproved = UTILITYSUPPORTM.checkSupportApprover("Train");
	taskApprovedString = String(taskApproved);
	}

if ((wfTask == "User Training" && taskApproved == false)) {
	errorMessage += br + "You are not listed as a trainer and cannot change the status." + br;
	}

if ((wfTask == "Department Request" && wfStatus == "Approved")) {
	var taskApproved = UTILITYSUPPORTM.checkSupportApprover(AInfo['userDepartment']);
	taskApprovedString = String(taskApproved);
	}

if (((wfTask == "Department Request" && wfStatus == "Approved") && (taskApproved == false))) {
	errorMessage += br + "You do not have permissions to approve user requests." + br;
	}

if (((wfTask == "Department Request" && wfStatus == "Approved") && (taskApprovedString.indexOf(":")) > 0)) {
	errorMessage += br + "Approval check returned error: " + taskApproved.replace("Error: ","");
	}

if ((wfTask == "Department Request" && wfStatus == "Approved" && AInfo['requestAction'] != "Disable")) {
	if (UTILITYSUPPORTM.getNumASITsOnCap(capId,"ACCESS RIGHTS") <= 0) errorMessage += br + "At least one Access Rights ASIT row must exist unless disabling an account." + br;
	}

if ((wfTask == "Department Request" && wfStatus == "Approved" && errorMessage == "")) {
	UTILITYSUPPORTM.departmentRequestApproved();
	}

if (wfTask == "User Training" && wfStatus == "Training Complete" && AInfo['Updated.Trainer'] == "") {
	errorMessage += br + "A Trainer must be specified." + br;
	}

if (wfTask == "User Training" && wfStatus == "Training Complete" && AInfo['Updated.Date of Training'] == "") {
	errorMessage += br + "A Date of Training must be specified." + br;
	}

if ((errorMessage != "")) {
	cancel=true;
	showMessage=true;
	comment("Update cancelled because of the following error(s): " + br + br + errorMessage);
	}


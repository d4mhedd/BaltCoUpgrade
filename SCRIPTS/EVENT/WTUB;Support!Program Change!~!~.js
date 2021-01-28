//WTUB;Support!Program Change!~!~
var taskApproved = false;
var errorMessage = "";
if ((wfStatus == "Not Needed")) {
	var deptComments = UTILITYSUPPORTM.getNumASITsOnCap(capId,"COMMENTS","Department",AInfo['initialDept']);
	var itComments = UTILITYSUPPORTM.getNumASITsOnCap(capId,"COMMENTS","Department","ITD");
	if ((deptComments <= 0) && (itComments <= 0)) errorMessage += br + "Need ASIT Comment line from requesting department or IT before setting 'Not Needed'." + br;
	}

if ((wfStatus == "Cancelled" || wfStatus == "Not Approved" || wfStatus == "More Info Needed" || wfStatus == "More Info Needed - Internal")) {
	var itComments = UTILITYSUPPORTM.getNumASITsOnCap(capId,"COMMENTS","Department","ITD");
	if (itComments <= 0) errorMessage += br + "Need ASIT Comment line from the IT dept to set status to '" + wfStatus + "'." + br;
	}

if ((wfTask == "AA Admin Final Review" && wfStatus == "Manager Approval Needed")) {
	var aaEstRows = UTILITYSUPPORTM.getNumASITsOnCap(capId,"ESTIMATIONS","Section","AA Admin");
	if (aaEstRows <= 0) errorMessage += br + "An ASIT Estimation line must be added for 'AA Admin' before continuing." + br;
	}

if ((wfStatus == "Estimated")) {
	var sectionTxt = wfTask.replace(" Review","");
	estimateRows = UTILITYSUPPORTM.getNumASITsOnCap(capId,"ESTIMATIONS","Section",sectionTxt);
	if (estimateRows <= 0) errorMessage += br + "An ASIT Estimation line must be added for '" + sectionTxt + "' before continuing." + br;
	}

if ((wfTask == "AA Admin Initial Review" && wfStatus == "Skip Section Estimates")) {
	if (isNaN(parseInt(getAppSpecific("itEstHours"))) == true) errorMessage += br + "Total Estimated Hours (ASI) is still required before continuing." + br;
	}

if ((wfStatus == "Estimated")) {
	var totalEstTime = parseInt(getAppSpecific("itEstHours"));
	var sumEstTime = UTILITYSUPPORTM.sumASITColumn(capId,"ESTIMATIONS","Time Estimate");
	if (sumEstTime > totalEstTime || isNaN(totalEstTime)) editAppSpecific("itEstHours",sumEstTime);
	}

if ((wfTask == "Departmental Request" && wfStatus == "Dept Approval")) {
	var taskApproved = UTILITYSUPPORTM.checkSupportApprover(AInfo['initialDept']);
	var taskApprovedString = String(taskApproved);
	}

if (((wfTask == "Departmental Request" && wfStatus == "Dept Approval") && (taskApproved == false))) {
	errorMessage += br + "You do not have permissions to approve program change requests.";
	}

if (((wfTask == "Departmental Request" && wfStatus == "Dept Approval") && (taskApprovedString.indexOf(":") > 0))) {
	errorMessage += br + "Approval check returned error: " + taskApproved.replace("Error: ","");
	}

if ((wfTask == "Departmental Request" && wfStatus == "Approved" && errorMessage  == "")) {
	UTILITYSUPPORTM.departmentRequestApproved();
	}

if ((errorMessage != "")) {
	cancel=true;
	showMessage=true;
	comment("Update cancelled because of the following error(s): " + br + br + errorMessage);
	}


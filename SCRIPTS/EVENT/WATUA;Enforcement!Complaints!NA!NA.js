//WATUA;Enforcement!Complaints!NA!NA
if ((wfTask == "Complaint Referral" && AInfo['newDepartment'] == undefined)) {
	cancel = true;
	showMessage = true;
	comment("<div style='font-size:125%;
	color:red'>Child record not created: No department selected in 'New Department' dropdown.</div>");
	}

if ((wfTask == "Complaint Referral" && AInfo['newDepartment'] != undefined)) {
	ENFORCEMENT_FUNCTIONS.referralChild(capId, wfStatus, AInfo['newDepartment'], wfComment);
	}

//WTUA;Support!User Request!~!~
if ((wfTask == "Department Request" && wfStatus == "Approved")) {
	UTILITYSUPPORTM.departmentRequestApproved();
	}

if (wfTask == "Account Maintenance" && wfStatus == "Request Performed" && AInfo['requestAction'] == "Add") {
	UTILITYSUPPORTM.emailTrainingCertificate(capId);
	}


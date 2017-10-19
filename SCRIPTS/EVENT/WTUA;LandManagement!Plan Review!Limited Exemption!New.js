//DLH 171012 conversion begin

if (wfTask==("Closure") && wfStatus ==("Approved")) {
	aa.runScript("CREATECHILD");
	}

if (wfTask==("Development Plan Decision") && (wfStatus ==("Approved") || wfStatus ==("Disapproved") || wfStatus ==("Approved with Conditions") )) {
	closeTask("Development Plan Review","Completed","Closed via Script","","PRLEMINOR");
	}

if (wfTask==("Board of Appeals Hearing Decision") && wfStatus ==("Resubmit Development Plan")) {
	closeTask("Appeals Process","Resubmit Development Plan","Closed via Script","","APPEALSMIN");
	activateTask("Development Plan Review");
	updateTask("Development Plan Review","Pending","Updated via Script","");
	activateTask("Development Plan Check Print");
	updateTask("Development Plan Check Print","Pending","Updated via Script","");
	}

if (wfTask==("Final Approval Processing") && wfStatus ==("Resubmit Development Plan")) {
	activateTask("Development Plan Review");
	updateTask("Development Plan Review","Pending","Updated via Script","");
	activateTask("Development Plan Check Print");
	updateTask("Development Plan Check Print","Pending","Updated via Script","");
	}

if (wfTask==("Board of Appeals Hearing Decision") && wfStatus ==("Resubmit Development Plan")) {
	activateTask("Development Plan Review");
	updateTask("Development Plan Review","Pending","Updated via Script","");
	activateTask("Development Plan Check Print");
	updateTask("Development Plan Check Print","Pending","Updated via Script","");
	}

if (wfTask==("Board of Appeals Hearing") && wfStatus ==("No Appeal")) {
	closeTask("Appeals Process","No Appeal","update via Script","");
	}

if (wfTask==("Board of Appeals Hearing") && wfStatus ==("No Appeal")) {
	closeTask("Board of Appeals Hearing Decision","Completed","Closed via Script","","APPEALSMIN");
	closeTask("Appeals Process","Completed","Closed via Script","","PRLEMINOR");
	}

if (wfTask==("Final Approval Processing") && wfStatus ==("Resubmit Development Plan") && isTaskActive("Closure")) {
	deactivateTask("Closure");
	}

if (wfTask==("Board of Appeals Hearing Decision") && (wfStatus ==("Resubmit Development Plan") || wfStatus ==("Completed") ) && isTaskActive("Appeals Process")) {
	deactivateTask("Appeals Process");
	}

if (wfTask==("Final Approval Processing") && wfStatus ==("Resubmit Development Plan") && isTaskActive("Final Approval Processing")) {
	deactivateTask("Final Approval Processing");
	}

if (wfTask==("Board of Appeals Hearing Decision") && (wfStatus ==("Community Appeal Denied") || wfStatus ==("Developer Appeal Denied"))) {
	closeTask("Appeals Process","Appeal Denied","update via Script","","PRLEMINOR");
	}
	
//DLH 171012 conversion end
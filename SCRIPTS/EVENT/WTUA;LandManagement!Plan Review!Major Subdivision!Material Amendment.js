//DLH 171012 conversion begin

if ((wfTask==("Closure") && wfStatus==("Approved"))) {
	//aa.runScript("UPDATEORIGFROMAMEND");
	updateOrigFromAmend();         //Replacing old methodology - jec 10/25/17
	}

if (wfTask==("Development Plan Conference") && wfStatus ==("Completed")) {
	closeTask("Development Plan Review","Completed","Closed via Script","","PRMAJORAMD");
	}

if (wfTask==("Concept Plan Conference") && wfStatus ==("Completed")) {
	closeTask("Concept Plan Review","Completed","Closed via Script","","PRMAJORAMD");
	}

if (wfTask==("Development Hearing Decision") && wfStatus ==("Additional CIM")) {
	activateTask("Community Input Meeting");
	updateTask("Community Input Meeting","Pending","Updated via Script","","PRMAJORAMD");
	closeTask("Development Plan Hearing","Completed","Closed via Script","","PRMAJORAMD");
	deactivateTask("Final Approval Processing");
	deactivateTask("Board of Appeals Hearing");
	deactivateTask("Appeals Process");
	}

if (wfTask==("Development Hearing Decision") && (wfStatus ==("Approved") || wfStatus == ("Disapproved") || wfStatus == ("Approved with Conditions"))) {
	closeTask("Development Plan Hearing","Completed","Closed via Script","","PRMAJORAMD");
	}

if (wfTask==("Development Hearing Decision") && wfStatus ==("Resubmit Development Plan")) {
	loopTask("Development Plan Hearing","Resubmit Development Plan","Closed and Looped via Script","","PRMAJORAMD");
	}

if (wfTask==("Development Hearing Decision") &&  wfStatus ==("Resubmit Concept Plan")) {
	branchTask("Development Plan Hearing","Resubmit Concept Plan","Branched via Script","","PRMAJORAMD");
	}

if (wfTask==("Board of Appeals Hearing Decision") && wfStatus ==("Resubmit Dev Plan Hearing")) {
	activateTask("Development Plan Hearing");
	activateTask("Development Plan Hearing");
	}

if (wfTask==("Board of Appeals Hearing Decision") && wfStatus ==("Resubmit Concept Plan")) {
	loopTask("Appeals Process","Resubmit Concept Plan","Looped via Script","","PRMAJORAMD");
	}

if (wfTask==("Board of Appeals Hearing Decision") && wfStatus ==("Resubmit Development Plan")) {
	branchTask("Appeals Process","Resubmit Development Plan","Branched via Script","","PRMAJORAMD");
	}

if (wfTask==("Board of Appeals Hearing Decision") && wfStatus ==("Additional Community Meeting")) {
	closeTask("Appeals Process","Additional Community Meeting","update via Script","","PRMAJORAMD");
	activateTask("Community Input Meeting");
	updateTask("Community Input Meeting","Pending","Updated via Script","","PRMAJORAMD");
	}

if (wfTask==("Board of Appeals Hearing Decision") && wfStatus == ("Resubmit Dev Plan Hearing")) {
	closeTask("Appeals Process","Completed","Completed via Script");
	deactivateTask("Plan Amendment");
	}

if (wfTask==("Board of Appeals Hearing Decision") && wfStatus == ("Resubmit Dev Plan Hearing") && !isTaskActive ("Final Approval Processing") && isTaskActive("Closure")) {
	deactivateTask("Closure");
	}

if (wfTask==("Board of Appeals Hearing") && wfStatus ==("No Appeal")) {
	closeTask("Board of Appeals Hearing Decision","Completed","Closed via Script","","APPEALS");
	closeTask("Appeals Process","Completed","Closed via Script","","PRMAJORAMD");
	}

if (wfTask==("Board of Appeals Hearing Decision") && (wfStatus ==("Community Appeal Denied") || wfStatus==("Completed") || wfStatus ==("Developer Appeal Denied"))) {
	closeTask("Appeals Process","Completed","Closed via Script","","PRMAJORAMD");
	}

if (wfTask==("Board of Appeals Hearing Decision") && (wfStatus ==("Community Appeal Denied") || wfStatus ==("Developer Appeal Denied")) && isTaskActive("Final Approval Processing")) {
	deactivateTask("Closure");
	}
	
//DLH 171012 conversion end
//DLH 171012 conversion begin

if (inspResult == "Violation Notice Issued") {
	updateTask("Investigation Status", "Pending", "Updated by Script", "");
	editTaskDueDate("Investigation Status",dateAdd("",5,"Working Days"));
	}

if (matches(inspResult, "Animal Control Notice Written", "Follow-Up Inspection Required")) {
	updateTask("Investigation Status", "Reinvestigate", "Updated by Script", "");
	}

if (matches(inspResult, "Animal Impounded", "Impound and Viol Notice Issued")) {
	branchTask("Investigation Status", "Animal Impounded", "Updated by Script", "");
	activateTask("Case Status");
	closeTask("Case Status","Closed","Closed via Scripted Inspection Result");
	}

if (matches(inspResult, "Unsubstantiated")) {
	branchTask("Investigation Status", "Unsubstantiated", "Updated by Script", "");
	activateTask("Case Status");
	}

if (matches(inspResult, "Animal Control Notice Written")) {
	updateTask("Investigation Status", "Investigation", "Updated by Script", "");
	}

if (matches(inspResult, "Unable to Locate")) {
	updateTask("Investigation Status", "Pending", "Updated by Script", "");
	}

if (matches(inspResult, "Referred to Another Agency")) {
	updateTask("Investigation Status", "Referred", "Updated by Script", "");
	}

if (inspResult == "Impound and Viol Notice Issued") {
	aa.env.setValue("sFromCap", capId);
	aa.runScript("CREATECHILDIMPOUND");
	}

if (inspResult == "Animal Impounded") {
	aa.env.setValue("sFromCap", capId);
	aa.runScript("CREATECHILDIMPOUND");
	}
	
//DLH 171012 conversion end
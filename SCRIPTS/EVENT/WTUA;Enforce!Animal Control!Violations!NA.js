//DLH 171012 conversion begin

if (wfTask == "Violation Initiated" && wfStatus == "AHB Hearing Requested") {
	deactivateTask("Board of Appeals");
	}

if (wfTask == "Violation Initiated" && wfStatus == "Board of Appeals Requested") {
	deactivateTask("Appeals To Animal Hearing Board");
	}

if (wfTask == "Violation Initiated" && wfStatus == "Paid") {
	deactivateTask("District Court");
	activateTask("Violation Status");
	}

if (wfTask == "Board of Appeals" && wfStatus == "Remanded to AHB") {
	deactivateTask("Board of Appeals");
	activateTask("Appeals To Animal Hearing Board");
	}

if (wfTask =="Violation Initiated" && wfStatus == "First Payment Letter Sent") {
	editTaskDueDate("Violation Initiated",dateAdd("",10, "Working Days"));
	}

if (wfTask =="Violation Initiated" && wfStatus == "Animal Demand Letter Sent") {
	editTaskDueDate("Violation Initiated",dateAdd("",120, "Working Days"));
	}

if (wfTask == "Appeals To Animal Hearing Board" && wfStatus == "Upheld") {
	editTaskDueDate("Violation Initiated",dateAdd(null, 30));
	editAppSpecific("AHB Upheld 45 Days",dateAdd(null,45));
	editAppSpecific("AHB Upheld 30 Days",dateAdd(null,30));
	}

if (wfTask == "Violation Initiated" && wfStatus == "Partial Payment Received") {
	editTaskDueDate("Violation Initiated",dateAdd("",30,"Working Days"));
	}
	
//DLH 171012 conversion end
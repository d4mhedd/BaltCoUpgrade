//DLH 171012 conversion begin

ad = aa.address.getAddressByCapId(capId).getOutput();
var Address=ad[0].getHouseNumberStart() + " " + ad[0].getStreetPrefix() + " " + ad[0].getStreetDirection() + " " + ad[0].getStreetName() + " " + ad[0].getStreetSuffix();
if (wfTask==("Intake") && wfStatus ==("Duplicate")) {
	emailContact("Baltimore County Complaint", "Thank you for submitting your complaint. An investigation is already underway for " + Address +  ". The inspector will be informed of your complaint in conjunction with the ongoing investigation. You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	}

if (wfTask == "Hearing Status" && wfStatus == "Dismissed by Inspector") {
	editTaskDueDate("Hearing Status", dateAdd(AInfo["Hearing Date"],1,"Y"));
	}

if (wfTask == "Inspection Status" && (wfStatus == "Correction Notice Mailed" || wfStatus == "Citation Mailed")) {
	editTaskDueDate("Inspection Status", dateAdd(AInfo["Compliance Date"], 1, "Y"));
	}

if (wfTask == "Court Status" && wfStatus == "Fine Imposed") {
	editTaskDueDate("Inspection Status", dateAdd("",30));
	}

if (wfTask == "Intake" && wfStatus == "Inspection Scheduled") {
	scheduleInspectDate("Initial Inspection",sysDateMMDDYYYY,null, null, "Scheduled via Workflow");
	closeTask("Intake","Inspection Scheduled","Closed via Workflow");
	}

if ((wfStatus == "No Violation") || (wfStatus == "In Compliance") || (wfStatus == "In Compliance - Paid")) {
	closeTask("Closure","Closed","Closed by Script","");
	}

if ((wfStatus == "Duplicate Reviewed")) {
	closeTask("Closure","Duplicate Reviewed","Closed by Script","");
	}

if (wfTask == "Court Status" && (wfStatus == "ALJ Dismissed" || wfStatus == "Order Filed" )) {
	scheduleInspectDate("Re-Inspection", dateAdd(AInfo["Hearing Date"],8), getLastInspector("Pre Hearing Inspection"));
	}

if ((wfTask == "Hearing Status" && wfStatus == "Postpone or Rescheduled")) {
	scheduleInspectDate("Pre Hearing Inspection",dateAdd(AInfo["Hearing Date"], -2),getLastInspector("Re-Inspection"));
	}

if ((wfStatus == "Dismissed by Inspector")) {
	closeTask("Closure","Close - Dismissed","Closed by Script","");
	}

if (wfTask=="Closure") {
	closeTask("Closure", "Closed", "Closed by Script", "");
	}

if ((currentUserGroup != "EnforcementPublicUser" || currentUserGroup != "PublicUser" ) &&wfTask==("Intake") && wfStatus ==("Closed")) {
	emailContact("Baltimore County Code Enforcement", "Thank you for submitting your complaint. After further review, this complaint has been closed.<br/><br/>Reason: " + wfComment +  "<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	branchTask("Intake","Closed","Closed via Workflow");
	closeTask("Closure", "Close - Dismissed", "Closed by Script", "");
	}
	
//DLH 171012 conversion end
//DLH 171012 conversion begin

ad = aa.address.getAddressByCapId(capId).getOutput();
if (ad[0].getHouseNumberStart() != null) {
	var Address = ad[0].getHouseNumberStart();
	}

if (ad[0].getStreetDirection() != null) {
	Address += " " + ad[0].getStreetDirection();
	}

if (ad[0].getStreetName() != null) {
	Address += " " + ad[0].getStreetName();
	}

if (ad[0].getStreetSuffix() != null) {
	Address += " " + ad[0].getStreetSuffix();
	}

if (wfTask==("Intake") && wfStatus ==("Duplicate")) {
	emailContact("Baltimore County Complaint", "Thank you for submitting your complaint. An investigation is already underway for " + Address +  ". The inspector will be informed of your complaint in conjunction with the ongoing investigation. You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	}

if (wfTask == "Hearing Status" && wfStatus == "Dismissed by Inspector") {
	editTaskDueDate("Hearing Status", dateAdd(AInfo["Hearing Date"],1,"Y"));
	}

if (wfTask == "Inspection Status" && (wfStatus == "Correction Notice Mailed" || wfStatus == "Citation Mailed")) {
	editTaskDueDate("Inspection Status", dateAdd(AInfo["Compliance Date"], 1, "Y"));
	}

if ((wfTask == "Hearing Status" && wfStatus == "Postpone or Rescheduled")) {
	scheduleInspectDate("Pre Hearing Inspection",dateAdd(AInfo["Hearing Date"], -2),getLastInspector("Re-Inspection"));
	}

if (wfTask == "Court Status" && wfStatus == "Fine Imposed") {
	editTaskDueDate("Inspection Status", dateAdd("",30));
	}

if (wfTask == "Court Status" && (wfStatus == "ALJ Dismissed" || wfStatus == "Order Filed" )) {
	scheduleInspectDate("Re-Inspection", dateAdd(AInfo["Hearing Date"],8), getLastInspector("Pre Hearing Inspection"));
	}

if ((wfStatus == "No Violation") || (wfStatus == "In Compliance") || (wfStatus == "In Compliance - Paid")) {
	closeTask("Closure","Closed","Closed by Script","");
	}

if (wfTask=="Closure" && wfStatus == "Closed") {
	closeTask("Closure", "Closed", "Closed by Script", "");
	}

if ((wfStatus == "Dismissed by Inspector")) {
	closeTask("Closure","Close - Dismissed","Closed by Script","");
	}

if ((wfStatus == "Out to Contractor")) {
	updateTask("Inspection Status", "Out to Contractor", "Updated by Script", "");
	scheduleInspectDate("Re-Inspection",nextWorkDay(dateAdd(null,30)),getLastInspector("Initial Inspection"));
	}
	
//DLH 171012 conversion end
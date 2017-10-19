//DLH 171012 conversion begin

var Comply = (AInfo["Compliance Date"]);
Comply = dateAdd(Comply, 1, "Y");
var Hearing = (AInfo["Hearing Date"]);
Hearing = dateSubWork(Hearing, -2, "Y");
var Inspector = currentUserID;
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

if ((inspResult == "Extension Granted" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "Extension Granted", "Updated by Script", "");
	scheduleInspectDate("Re-Inspection",nextWorkDay(dateAdd(null,30)),Inspector, null, "Scheduled via Inspection Result");
	}

if ((inspResult == "Research"  && isTaskActive("Inspection Status"))) {
	scheduleInspectDate("Re-Inspection",nextWorkDay(dateAdd(null,30)),Inspector, null, "Scheduled via Inspection Result");
	}

if ((inspResult == "In Violation" && inspType == "Pre Hearing Inspection" && isTaskActive("Inspection Status"))) {
	closeTask("Inspection Status", "Pre Hearing Insp Complete", "Updated by Script", "");
	}

if ((inspResult == "In Compliance" && inspType == "Pre Hearing Inspection")) {
	closeTask("Inspection Status", "Pre Hearing Insp Complete", "Updated by Script", "");
	branchTask("Hearing Status", "Dismissed by Inspector", "Updated by Script", "");
	closeTask("Closure","Close - Dismissed","Closed by Script","");
	emailContact("Baltimore County Complaint", "Your Complaint # " + capIDString + " has been inspected and the inspection has resulted in Dismissed by Inspector being sent to the owner of the property located at " + Address +  ". This is a system generated email. DO NOT REPLY", "Complainant");
	}

if ((inspResult == "In Compliance" && inspType == "Re-Inspection" && isTaskActive("Inspection Status"))) {
	branchTask("Inspection Status", "In Compliance", "Updated by Script", "");
	closeTask("Closure", "Closed", "Updated by Script", "");
	}

if ((inspResult == "Correction Notice Issued" && isTaskActive("Inspection Status"))) {
	editTaskDueDate("Inspection Status", Comply);
	}

if ((inspResult == "Correction Notice Issued" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "Correction Notice Issued", "Updated by Script", "");
	scheduleInspectDate("Re-Inspection",Comply, Inspector , null, "Scheduled via Inspection Result");
	emailContact("Baltimore County Complaint", "Complaint number " + capIDString + ".<br/><br/>Upon inspection of " + Address + " a correction notice has been issued to the property owner.<br/><br/>You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	}

if ((inspResult == "Citation Issued") && isTaskActive("Inspection Status")) {
	updateTask("Inspection Status", "Citation Issued", "Updated by Script", "");
	scheduleInspectDate("Pre Hearing Inspection",Hearing, Inspector, null, "Scheduled via Inspection Result");
	emailContact("Baltimore County Complaint", "Complaint Number " + capIDString + ".<br/><br/>Upon inspection of " + Address +  ", a Citation has been issued to the property owner. A hearing will be held on "+ AInfo["Hearing Date"] +" at the Jefferson Building, Room 205, 105 West Chesapeake Avenue, Towson, MD 21204.<br/><br/>You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	}

if ((inspResult == "No Violation"  && inspType == "Initial Inspection" && isTaskActive("Inspection Status"))) {
	branchTask("Inspection Status", "No Violation", "Updated by Script", "");
	closeTask("Closure", "Closed", "Updated by Script", "");
	emailContact("Baltimore County Complaint", "Complaint number " + capIDString + ".<br/><br/>An inspection of " + Address +  " found no Baltimore County code violations.<br/><br/>You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	}

if ((inspResult == "In Compliance - Paid" && inspType == "Re-Inspection" && isTaskActive("Inspection Status"))) {
	branchTask("Inspection Status", "In Compliance - Paid", "Updated by Script", "");
	closeTask("Closure", "Closed", "Updated by Script", "");
	}

if ((inspResult == "In Compliance - Lien" && inspType == "Re-Inspection" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "In Compliance - Lien", "Updated by Script", "");
	}

if ((inspResult == "Monitor" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "Monitor", "Updated by Script", "");
	scheduleInspectDate("Re-Inspection",nextWorkDay(dateAdd(null,30)),Inspector, null, "Scheduled via Inspection Result");
	}

if ((inspResult == "Out to Contractor" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "Out to Contractor", "Updated by Script", "");
	scheduleInspectDate("Re-Inspection",nextWorkDay(dateAdd(null,30)),Inspector, null, "Scheduled via Inspection Result");
	}

if ((inspResult == "Request for Contractor" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "Request for Contractor", "Updated by Script", "");
	}
	
//DLH 171012 conversion end
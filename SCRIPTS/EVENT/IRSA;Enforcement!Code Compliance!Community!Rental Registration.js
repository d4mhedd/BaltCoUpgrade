//DLH 171012 conversion begin

var Comply = (AInfo["Compliance Date"]);
Comply = dateAdd(Comply, 1, "Y");
var Hearing = (AInfo["Hearing Date"]);
Hearing = dateSubWork(Hearing, -2, "Y");
var Inspector = getLastInspector(inspType);
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

if ((inspResult == "Extension Granted" && inspType == "Re-Inspection" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "Extension Granted", "Updated by Script", "");
	scheduleInspectDate("Re-Inspection",Comply,Inspector, null, "Scheduled via Inspection Result");
	}

if ((inspResult == "Research"  && inspType == "Initial Inspection" && isTaskActive("Inspection Status"))) {
	scheduleInspectDate("Initial Inspection",Comply, Inspector, null, "Scheduled via Inspection Result");
	}

if ((inspResult == "In Compliance" && inspType == "Pre Hearing Inspection" && isTaskActive("Hearing Status"))) {
	closeTask("Hearing Status", "Dismissed by Inspector", "Updated by Script", "");
	closeTask("Inspection Status", "In Compliance", "Updated by Script", "");
	closeTask("Closure","Close - Dismissed","Closed by Script","");
	}

if ((inspResult == "In Compliance" && inspType == "Re-Inspection" && isTaskActive("Inspection Status"))) {
	branchTask("Inspection Status", "In Compliance", "Updated by Script", "");
	closeTask("Closure", "Closed", "Updated by Script", "");
	}

if ((inspResult == "Correction Notice Issued" && isTaskActive("Inspection Status"))) {
	editTaskDueDate("Inspection Status", Comply);
	}

if ((inspResult == "Correction Notice Issued" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "Correction Notice Mailed", "Updated by Script", "");
	scheduleInspectDate("Re-Inspection",Comply, Inspector , null, "Scheduled via Inspection Result");
	emailContact("Baltimore County Complaint", "Complaint number " + capIDString + ".<br/><br/>Upon inspection of " + Address + " a correction notice has been issued to the property owner.<br/><br/>You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	}

if ((inspResult == "Citation Issued") && isTaskActive("Inspection Status")) {
	updateTask("Inspection Status", "Citation Mailed", "Updated by Script", "");
	scheduleInspectDate("Pre Hearing Inspection",Hearing, Inspector, null, "Scheduled via Inspection Result");
	emailContact("Baltimore County Complaint", "Complaint Number " + capIDString + ".<br/><br/>Upon inspection of " + Address +  ", a Citation has been issued to the property owner. A hearing will be held on "+ AInfo["Hearing Date"] +" at the Jefferson Building, Room 205, 105 West Chesapeake Avenue, Towson, MD 21204.<br/><br/>You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	}

if ((inspResult == "No Violation"  && inspType == "Initial Inspection" && isTaskActive("Inspection Status"))) {
	branchTask("Inspection Status", "No Violation", "Updated by Script", "");
	closeTask("Closure", "Closed", "Updated by Script", "");
	emailContact("Baltimore County Complaint", "Complaint number " + capIDString + ".<br/><br/>An inspection of " + Address +  " found no Baltimore County code violations.<br/><br/>You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
	}
	
//DLH 171012 conversion end
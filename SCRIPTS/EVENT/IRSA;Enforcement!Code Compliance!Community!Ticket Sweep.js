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

if ((inspResult == "In Violation" && inspType == "Pre Hearing Inspection" && isTaskActive("Inspection Status"))) {
	closeTask("Inspection Status", "Pre Hearing Insp Complete", "Updated by Script", "");
	}

if ((inspResult == "In Compliance" && inspType == "Pre Hearing Inspection")) {
	closeTask("Inspection Status", "Pre Hearing Insp Complete", "Updated by Script", "");
	branchTask("Hearing Status", "Dismissed by Inspector", "Updated by Script", "");
	closeTask("Closure","Close - Dismissed","Closed by Script","");
	emailContact("Baltimore County Complaint", "Your Complaint # " + capIDString + " has been inspected and the inspection has resulted in Dismissed by Inspector being sent to the owner of the property located at " + Address +  ". This is a system generated email. DO NOT REPLY", "Complainant");
	}

var Inspector = currentUserID;
if ((inspResult == "Out to Contractor" && inspType == "Pre Hearing Inspection")) {
	updateTask("Inspection Status", "Out to Contractor", "Updated by Script", "");
	scheduleInspectDate("Pre Hearing Inspection",nextWorkDay(dateAdd(null,30)),Inspector, null, "Scheduled via Inspection Result");
	}

if ((inspResult == "Request for Contractor" && isTaskActive("Inspection Status"))) {
	updateTask("Inspection Status", "Request for Contractor", "Updated by Script", "");
	}
	
//DLH 171012 conversion end
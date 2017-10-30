//DLH 171012 conversion begin
//@TODO: This is never going to execute because the group doesn't match

if (AInfo["Receipt Number"] !=null && AInfo["Receipt Date"] != null) {
	updateTask("License Issuance","Issued","Updated via renewal update");
	}

if (currentUserGroup != "LicensesPublicUser" && isTaskActive("License Issuance") && AInfo["Receipt Number"] !=null && AInfo["Receipt Date"] != null) {
	var currentDate = new Date();
	var currentYear = "" + sysDate.getYear();
	var nextYear = "" + (sysDate.getYear() + 1);
	var startRange = "01/01/" + currentYear;
	var dStartDate = new Date(startRange);
	var endRange = "05/01/" + currentYear;
	var dEndDate = new Date(endRange);
	var bCurrentYear = false;
	if( currentDate >= dStartDate && currentDate < dEndDate) bCurrentYear = true;
	if(bCurrentYear) licEditExpInfo("Active", "06/30/" + currentYear);
	if(!bCurrentYear) licEditExpInfo("Active", "06/30/" + nextYear);
	}
	
//DLH 171012 conversion end
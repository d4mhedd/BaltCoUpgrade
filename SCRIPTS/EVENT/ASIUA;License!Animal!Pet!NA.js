//DLH 171012 conversion begin

if (isTaskStatus("License Issuance","Pending") || isTaskStatus("License Issuance","Renewal Pending") || isTaskStatus("License Issuance","Renewal") || isTaskStatus("License Issuance","Expired")) {
	updateTask("License Issuance","Issued","Updated via renewal update");
	}

if (isTaskStatus("License Issuance","Issued")) {
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

if (isTaskStatus("License Issuance","Issued")) {
	aa.runScript("RunReport");
	}
	
//DLH 171012 conversion end
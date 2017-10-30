//DLH 171012 conversion begin

if (isTaskStatus("License Issuance","Pending") || isTaskStatus("License Issuance","Renewal Pending")) {
	updateTask("License Issuance","Issued","Updated via Application Submittal");
	}

if (currentUserGroup != "LicensePublicUser" && isTaskActive("License Issuance")) {
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

if (currentUserGroup == "LicensePublicUser" && (AInfo["Senior Citizen"] == "Yes"  ||  AInfo["Senior Citizen"] == "Y")) {
	branch("CalAnimalFeesSenior");
	}

if (currentUserGroup == "LicensePublicUser" && ( AInfo["Senior Citizen"] == "No"  ||  AInfo["Senior Citizen"] == "N")) {
	branch("CalAnimalFeesNonSenior");
	}

if (currentUserGroup != "LicensePublicUser") {
	//aa.runScript("RunReport");
	runPetLicenseReport();     //Modified 10.30.17 for rewritten code
	}

//DLH 171012 conversion end
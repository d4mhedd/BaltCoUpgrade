if (wfTask==("Application Review") && wfStatus==("Approved") || wfTask==("Issuance") && (wfStatus == "Accepted Renew")) {
	updateTask("Issuance","Issued","Updated via Approval");
	var currentDate = new Date();
	var currentYear = "" + sysDate.getYear();
	var nextYear = "" + (sysDate.getYear() + 1);
	var startRange = "01/01/" + currentYear;
	var dStartDate = new Date(startRange);
	var endRange = "07/01/" + currentYear;
	var dEndDate = new Date(endRange);
	var bCurrentYear = false;
	if( currentDate >= dStartDate && currentDate < dEndDate) bCurrentYear = true;
	if(bCurrentYear) licEditExpInfo("Active", "07/31/" + currentYear);
	if(!bCurrentYear) licEditExpInfo("Active", "07/31/" + nextYear);
	}

if (wfTask==("Application Review") && wfStatus==("Approved") || wfTask==("Issuance") && (wfStatus == "Accepted Renew")) {
	emailContact("Baltimore County Residential Parking Permit Application"," Your Residential Parking Permit application has been approved. Your record number is " + capIDString + ". You should receive your parking sticker within 10-20 business days. <br\><br\> Remember, the Residential Parking Permit must be renewed annually. <br\><br\> This is a system generated email.  DO NOT REPLY.", "Applicant");
	}

if ((wfTask == "Issuance" && wfStatus == "Closed") || (wfTask == "Closure" && wfStatus == "Closed") || (wfTask == "Issuance" && wfStatus == "Expired") || (wfTask == "Application Review" && wfStatus == "Denied")) {
	var currentYear = "" + sysDate.getYear();
	licEditExpInfo("Expired", "07/31/" + currentYear);
	}
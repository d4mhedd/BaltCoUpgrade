//DLH 171012 conversion begin

var email1 = "In order to process your application or renew your pet’s license, you must fax <b>a valid rabies certificate for each pet being licensed</b> and your <b>record number</b> above to 410-887-4578.  We must receive this information within ten days of the date of this email.<br/><br/>If you fail to provide this information within ten days, your application or renewal will be rejected and your pet(s) will not be licensed.  No refund will be issued.<br/><br/><br/>Miscellaneous Permits and Licenses<br/><br/>County Office Building<br/><br/>111 West Chesapeake Avenue, Room 101<br/><br/>Towson, Maryland 21204<br/><br/>Phone: 410-887-3630";
if (wfTask==("License Issuance") && wfStatus==("Issued")) {
	emailContact("Baltimore County Animal License","Thank you for submitting your Animal License application online. Your record number is " + capIDString + ". You should receive your animal tag within 2-4 weeks.  If this is a renewal then your current animal tag is now renewed. NOTE: During the months of May-August, licenses may take up to 10 weeks for processing.","Pet Owner");
	}

if (wfTask==("License Issuance") && (wfStatus==("Issued") || wfStatus==("Issued ACA"))) {
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

if (wfTask==("License Issuance") && wfStatus==("Closed")) {
	var currentYear = "" + sysDate.getYear();
	licEditExpInfo("Expired", "06/30/" + currentYear);
	}

if (wfTask==("License Issuance") && wfStatus==("Incomplete")) {
	emailContact("Action Required for Your Pet License Application or Renewal","RECORD NUMBER: " + capIDString + " <br/><br/>Thank you for attempting to apply for or renew your pet license online.  Unfortunately, the information you provided was incomplete.  Typically, an application or renewal is deemed incomplete for any of the following reasons:<br/><br/> <li>A rabies certificate was not provided for each pet;
	</li><br/> <li>An expired rabies certificate was provided;
	</li> <br/> <li>A rabies certificate provided does not match the information you entered;
	</li> <br/> <li>A rabies certificate provided is for the wrong pet.</li> <br/><br/>" + email1 + "" ,"Pet Owner");
	}
	
//DLH 171012 conversion end
if ((wfTask == "Issuance" && wfStatus == "Issued") && !getParents("MiscPermits/Residential Parking/Residential Parking Permit/Permit")) {
	branch("ContactCheck");
	branch("RESPARK:Issue Residential Parking Permit");
	}

if ((wfTask == "Issuance" && wfStatus == "Issued")) {
	closeTask("Issuance","Completed","Permit record was created","Updated via script");
	updateAppStatus("Completed","Application is completed since the parent Permit was activated. Updated via script WTUA:MiscPermits/Residential Parking/Residential parkign Permit/Application.");
	}

if ((wfTask == "Issuance" && wfStatus == "Issued")) {
	closeTask("Closure","Completed","Permit record was created","Updated via script.");
	}

if ((wfTask == "Issuance" && wfStatus == "Issued")) {
	emailContact("Baltimore County Residential Parking Permit Application"," Your Residential Parking Permit application has been approved. Your record number is " + capIDString + ". You should receive your parking sticker within 10-20 business days. <br\><br\> Remember, the Residential Parking Permit must be renewed annually. <br\><br\> This is a system generated email.  DO NOT REPLY.", "Applicant");
	}
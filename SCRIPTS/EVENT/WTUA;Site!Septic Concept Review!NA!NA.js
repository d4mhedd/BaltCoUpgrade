//WTUA;Site!Septic Concept Review!NA!NA
if (wfTask=="Application Intake") {
	editTaskSpecific("Review","numberOfSubmittals",parseInt(AInfo['numberOfSubmittals'])+ 1);
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review" && wfStatus == "Approved" && parseInt(AInfo['numberOfSubmittals']) > 2 && feeExists("DS0086"))) {
	addFee("DS0162", "Septic Concept", "Final", 1, "N");
	}

if (wfTask=="Review" && matches(wfStatus, "Approved","Denied")) {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Review" && matches(wfStatus, "Approved","Denied") && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ( "Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". They need to be notified their application has been "+wfStatus);
	}

if (wfTask=="Review" && matches(wfStatus, "Approved","Denied") && appEmail!=null) {
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	retArr = DEV_LYNDA_WACHT.getPimaContactInfo(capId);
	templateParameters.deptPhone = retArr["contPhone"];
	templateParameters.deptWebsite = retArr["contWebsite"];
	templateParameters.department = retArr["department"];
	templateParameters.recordAlias = retArr["recordAlias"];
	templateParameters.applicant = retArr["applicant"];
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(appEmail,sysFromEmail,"","AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters,null);
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Review"  && wfStatus=="Request for Corrections" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is Notice Request for Corrections_AllSingleReview.");
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections" && appEmail!=null) {
	var retArr = DEV_LYNDA_WACHT.getPimaContactInfo(capId);
	var notificationParameters = new Object();
	notificationParameters.altId=capId.getCustomID();
	notificationParameters.capAlias=cap.getCapType().getAlias();
	notificationParameters.capStatus=capStatus;
	notificationParameters.balanceDue=balanceDue;
	notificationParameters.toEmail=appEmail;
	notificationParameters.toCC="";
	notificationParameters.applicantName=retArr["applicant"];
	notificationParameters.phone=retArr["contPhone"];
	notificationParameters.acaUrl=retArr["contWebsite"];
	var parameters = aa.util.newHashMap();
	parameters.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", parameters, "AA_Notice Request for Corrections_AllSingleReview", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}


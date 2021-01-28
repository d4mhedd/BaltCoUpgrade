//WTUA;Planning!Zoning Use!NA!NA
if (matches(AInfo['subType'],"Assisted Living","Adult/Child Care 6 or Less", "Adult/Child Care 7 - 10", "Group Home", "Home Occupation", "MU Special Use", "Secondary Dwelling") && ((wfTask == "Public Hearing" && wfStatus == "Approved") || (wfTask == "Review" && (wfStatus == "Approved" || wfStatus == "Approved with Conditions")))) {
	var params = aa.util.newHashMap();
	WFMODULE.displayReportFromWorkflow("General Permit", params);
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Review"  && wfStatus=="Request for Corrections" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'Notice of Request for Corrections'.");
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
	notificationParameters.Dept=retArr["department"];
	var br = "<br>";
	var retArr = new Array();
	retArr = DEV_LYNDA_WACHT.getPimaContactInfo();
	var parameters = aa.util.newHashMap();
	parameters.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections", parameters, "AA_Notice Request for Corrections_AllSingleReview", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}

if (AInfo['subType'] != "Modification of Setback Requirements" && (wfTask == "Public Hearing" && matches(wfStatus, "Approved", "Denied"))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if (AInfo['subType'] == "Modification of Setback Requirements" && (wfTask == "Review" && matches(wfStatus, "Approved", "Approved with Conditions", "Denied"))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}


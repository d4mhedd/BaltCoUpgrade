//WTUA;Building!Registered Plant!NA!NA
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
	notificationParameters.Dept=retArr["department"];
	var parameters = aa.util.newHashMap();
	parameters.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview", parameters, "AA_Notice Request for Corrections_AllSingleReview", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask == "Review" && wfStatus == "Approved") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Project Approval", reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask=="Issuance" && wfStatus=="Issued") {
	var appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Issuance"  && wfStatus=="Issued" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is General Permit.");
	}

if (wfTask == "Issuance" && wfStatus == "Issued" && appEmail!=null) {
	var vEParams = aa.util.newHashtable();
	var vRParams = aa.util.newHashtable();
	vRParams.put("PermitNumber", capId.getCustomID());
	var vAsyncScript = "RUNREPORTEMAILASYNC";
	var envParameters = aa.util.newHashMap();
	envParameters.put("vCapId", capId);
	envParameters.put("vEventName", "WorkflowTaskUpdateAfter");
	envParameters.put("vCurrentUserID", currentUserID);
	envParameters.put("vParentCapId", "");
	envParameters.put("vEParams", vEParams);
	envParameters.put("vRParams", vRParams);
	envParameters.put("vEmailTemplate", "AA_GENERAL_PERMIT");
	envParameters.put("vContactTypes", "Applicant");
	envParameters.put("vReportName", "General Permit");
	envParameters.put("vReportModule", "BUILDING");
	aa.runAsyncScript(vAsyncScript, envParameters);
	}

//WTUA;Site!Final Plat!NA!NA
if (wfTask=="Admin Review" &&wfStatus=="Administratively Complete") {
	editAppSpecific("applicationExpiration",(dateAddMonths(null,36)));
	}

if (wfTask=="Review Consolidation"&&matches(wfStatus,"Request for Corrections","Approved")) {
	editAppSpecific("applicationExpiration",(dateAddMonths(null,36)));
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.WTUA_FinalPlatFees();
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2)) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0069", "FINAL PLAT", "Final", 1, "N");
	}

appEmail =null;
if (wfTask=="Admin Review" && wfStatus=="Administratively Complete") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + + "does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ".  The notification they need is 'AA_SITE/DEVELOPMENT CONCEPT PERMIT ADMIN COMPLETE'.");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail!=null) {
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

if (wfTask=="Invoicing" && wfStatus=="Invoice Fees") {
	var appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Invoicing" && wfStatus=="Invoice Fees" && appEmail==null) {
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"],"Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The report that needs to be mailed is 'PimaInvoice.");
	}

if (wfTask=="Invoicing" && wfStatus=="Invoice Fees" && appEmail!=null) {
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
	notificationParameters.balanceDue =Number(balanceDue).toFixed(2);
	notificationParameters.acaUrl=retArr["contWebsite"];
	notificationParameters.address = UTILITYMODULE.getCapAddress(capId);
	notificationParameters.capAlias = cap.getCapType().getAlias();
	var parameters = aa.util.newHashMap();
	parameters.put("capID", capId.getCustomID());
	parameters.put("invoicenbr",FEE_UTILS_MODULE.getUnpaidInvoice2(capId).toString());
	UTILITYMODULE.sendEmail(capId, "Invoice", parameters, "AA_Notice_Plat_Invoice", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}

tentPlat = false;
if (wfTask == "Record Plat" && wfStatus == "Complete") {
	var tentPlat = getParent("Site/Tentative Plat/NA/NA");
	}

if (tentPlat) {
	currCap=capId;
	capId=tentPlat;
	tentStatus=UTILITYMODULE.getMostRecentAppStatus();
	capId=currCap;
	}

if (wfTask == "Record Plat" && wfStatus == "Complete" && tentPlat && tentStatus!= "Final") {
	currCap=capId;
	capId=tentPlat;
	closeTask("Close Out", "Final", "Updated via script", "");
	updateAppStatus("Final", "Updated via script", tentPlat);
	addStdCondition("General", "Record Finaled");
	capId=currCap;
	}

if (wfTask=="Admin Review" && wfStatus=="Deficient") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Admin Review" && wfStatus=="Deficient" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant" + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'Notice of Admin Review Deficiency'.");
	}

if (wfTask == "Admin Review" && wfStatus == "Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = "Deficient";
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "AA_NOTICE OF ADMIN REVIEW DEFICIENCY",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (matches(wfTask, "Review Consolidation", "Review") && wfStatus=="Request for Corrections") {
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_APPLICATION_STATUS", "Applicant", "Notice of Request for Corrections", "BUILDING");
	}

if (wfTask == "BOS Hearing" && matches(wfStatus, "Approved", "Denied")) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}


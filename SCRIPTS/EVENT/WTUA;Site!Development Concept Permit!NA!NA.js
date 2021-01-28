//WTUA;Site!Development Concept Permit!NA!NA
var appEmail = null;
appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
if (wfTask=="Admin Review" && wfStatus=="Administratively Complete") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The phone number is: "  + contArray[x]["phone1"] + ".  The notification they need is 'AA_SITE/DEVELOPMENT CONCEPT PERMIT ADMIN COMPLETE'.");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail!=null) {
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(appEmail,sysFromEmail,"","AA ADMIN COMPLETE",templateParameters,null);
	}

if (AInfo['detentionWaiverRequested']=="Yes" && wfTask=="Admin Review" && wfStatus =="Administratively Complete") {
	parentCapId = capId;
	var childCap =createChild("Site", "Detention Waiver Review", "NA","NA", capName);
	capId=childCap;
	closeTask("Application Intake","Submitted", "Application successfully submitted", "Closed via Script");
	capId=parentCapId;
	}

if (wfTask=="Review Consolidation" && wfStatus == "Approved") {
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2)) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0072", "DEVELOPMENT CONCEPT", "Final", 1, "N");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && AInfo['riparianHabitatPlanIncluded'] == "Yes") {
	createChild("Site", "Riparian", "NA","NA", "");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0074"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++)  addFee("DS0076", "DEVELOPMENT CONCEPT", "Final", 1, "N");
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.WTUA_SiteDevelopementConceptFees();
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0084"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0087", "DEVELOPMENT CONCEPT", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0085"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0161", "DEVELOPMENT CONCEPT", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0086"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0162", "DEVELOPMENT CONCEPT", "Final", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0088"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0163", "DEVELOPMENT CONCEPT", "Final", 1, "N");
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

if (wfTask=="Issuance" && wfStatus=="Issued") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Issuance" && wfStatus=="Issued" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  They need their permit mailed to them.");
	}

if (wfTask=="Issuance" && wfStatus=="Issued" && appEmail!=null) {
	var retArr = DEV_LYNDA_WACHT.getPimaContactInfo(capId);
	var notificationParameters = new Object();
	notificationParameters.altId=capId.getCustomID();
	notificationParameters.capAlias=cap.getCapType().getAlias();
	notificationParameters.appStatus=capStatus;
	notificationParameters.address = UTILITYMODULE.getCapAddress(capId);
	notificationParameters.balanceDue=balanceDue;
	notificationParameters.toEmail=appEmail;
	notificationParameters.toCC="";
	notificationParameters.applicantName=retArr["applicant"];
	notificationParameters.phone=retArr["contPhone"];
	notificationParameters.acaUrl=retArr["contWebsite"];
	var parameters = aa.util.newHashMap();
	parameters.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "General Permit", parameters, "AA_GENERAL_PERMIT", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}


//WTUA;Site!Site Construction!NA!NA
appEmail = null;
if (wfTask=="Admin Review" && wfStatus =="Administratively Complete" && AInfo['detentionWaiverRequested']=="Yes") {
	parentCapId = capId;
	var childCap =createChild("Site", "Detention Waiver Review", "NA","NA", capName);
	capId=childCap;
	closeTask("Application Intake","Submitted", "Application successfully submitted", "Closed via Script");
	capId=parentCapId;
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete") {
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail==null) {
	showMessage=true;
	contArray= getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " +contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " +contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] +" " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'AA ADMIN COMPLETE'.");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail!=null) {
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(appEmail,sysFromEmail,"","AA ADMIN COMPLETE",templateParameters,null);
	}

if (wfTask=="Review Consolidation" && wfStatus == "Approved") {
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && AInfo['section10OptIN']=="Yes" && lookup("SECTION10", "ACTIVATED")=="Yes") {
	var childCapId = createChild("Site", "S10 Certificate of Coverage", "NA","NA", capName);
	copyOwner(capId, childCapId);
	var parentCap = capId;
	capId = childCapId;
	APO_FUNCTIONS.loadExtraParcelData(childCapId);
	updateAppStatus("Application Pending","Set initial child record status");
	capId = parentCap;
	S10_SITE.setRecordName(childCapId);
	S10_SITE.sendApplicationPendingEmail(childCapId);
	S10_SITE.assignTaskandNotifyGU(childCapId);
	}

if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.assessWallsFencesFee();
	}

FEE_UTILS_MODULE.WTUA_SiteConstructionFees();
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2)) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	var feeItem = "";
	if(AInfo['developmentConceptPlanIncluded'] == "Yes") feeItem = "DS0072";
	if(AInfo['developmentConceptPlanIncluded'] != "Yes") feeItem = "DS0079";
	if(!feeExists(feeItem)) for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee(feeItem, "SITE CONSTRUCTION", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0074"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0076", "SITE CONSTRUCTION", "Final", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0084"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0087", "SITE CONSTRUCTION", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0085"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0161", "SITE CONSTRUCTION", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0086"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0162", "SITE CONSTRUCTION", "FInal", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Review Consolidation" && wfStatus == "Approved" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0088"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0163", "SITE CONSTRUCTION", "FInal", 1, "N");
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" &&  !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" &&  !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && appEmail==null && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " +  contArray[x]["firstName"] + " " + contArray[x]["lastName"] + + "does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'AA_APPROVAL EMAIL'.");
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" &&  !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && appEmail!=null && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
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
	}

if (balanceDue <= 0 && isTaskActive("Issuance") && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() && getChildren("Building/Revision/*/*", capId) == null) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,12)));
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" &&  !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) &&DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	comment("Permit has not been issued due tothe following condition(s) having a 'Prior to Issuance' action: " + DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	}

if (((wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" &&  !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId))  || (wfTask=="Issuance" &&wfStatus=="Issued")) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	DEV_LYNDA_WACHT.changeDocCategory("Site Construction Drawings", "Approved Site Construction Drawings");
	DEV_LYNDA_WACHT.changeDocCategory("Revision Plan Set", "Approved Revision Plan Set");
	}

if (wfTask == "Inspection" && wfStatus == "Revoked") {
	addStdCondition("Record Status","Record Revoked");
	childCaps =getChildren("Building/Revision/NA/NA");
	for(x in childCaps) if(!matches(aa.cap.getCap(childCaps[x]).getOutput().capStatus,"Complete", "Withdrawn","Final")) updateAppStatus("Revoked","Revoked during inspection", childCaps[x]);
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" &&  !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	setTask("Issuance", "N","Y");
	setTask("Inspection", "Y","N");
	setTask("GIS Update", "Y","N");
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

if (wfTask=="Invoicing" && wfStatus =="No Additional Fees Required" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	comment("Record could not auto-issue. There are assessed/invoiced fees on the record.");
	}


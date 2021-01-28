//WTUA;Site!SIte Construction Building!NA!NA
appEmail =null;
addInspections=false;
if (wfTask=="Admin Review" && wfStatus=="Administratively Complete") {
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  The notification they need is 'AA ADMIN COMPLETE'.");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail!=null) {
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(appEmail,sysFromEmail,"","AA ADMIN COMPLETE",templateParameters,null);
	}

if (wfTask=="Admin Review" && wfStatus=="Deficient") {
	assignTask("Admin Review", "BackgroundGU");
	}

if (wfTask=="Review Consolidation" && wfStatus == "Approved") {
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && appEmail==null && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment("Applicant " + contArray[x]["firstName"] + " " +contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " +contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phonenumber is: " + contArray[x]["phone1"] + ". The notification they need is 'AA_APPROVAL EMAIL'.");
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && appEmail!=null && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
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

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) &&DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	comment("Permit has not been issued due tothe following condition(s) having a 'Prior to Issuance' action: " + DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	}

if (((wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) || (wfTask=="Issuance" &&wfStatus=="Issued")) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	DEV_LYNDA_WACHT.changeDocCategory("Approved Pending Site Construction / Building Drawings", "Approved Site Construction / Building Drawings");
	DEV_LYNDA_WACHT.changeDocCategory("Approved Pending Revision Site Construction / Building Drawings", "Approved Revision Site Construction / Building Drawings");
	}

if (AInfo['detentionWaiverRequested']=="Yes" && wfTask=="Admin Review" && wfStatus =="Administratively Complete") {
	parentCapId = capId;
	var childCap =createChild("Site", "Detention Waiver Review", "NA","NA", capName);
	capId=childCap;
	closeTask("Application Intake","Submitted", "Application successfully submitted", "Closed via Script");
	capId=parentCapId;
	}

if (wfTask=="Admin Review" && wfStatus == "Add Inspections") {
	nbrAddInspectStatus= 0;
	workflowResult = aa.workflow.getTasks(capId);
	wfObj = workflowResult.getOutput();
	for (i in wfObj) if(wfObj[i].getTaskDescription()=="Admin Review" && wfObj[i].getDisposition()=="Add Inspections") nbrAddInspectStatus+=1;
	if (nbrAddInspectStatus == 1 && wfTask=="Admin Review" && (wfStatus == "Add Inspections")) addInspections= true;
	}

if (addInspections) {
	branch("EMSE:BuildingAutoAddInspections");
	createPendingInspection("SC_SITCONS","0200 Site Pre-Construction Meeting");
	createPendingInspection("SC_SITCONS","0210 Grading");
	createPendingInspection("SC_SITCONS","0220 Final Site");
	}

if (wfTask == "Inspection" && wfStatus == "Revoked") {
	addStdCondition("Record Status","Record Revoked");
	childCaps = getChildren("Building/Revision/NA/NA");
	for(x in childCaps) if(!matches(aa.cap.getCap(childCaps[x]).getOutput().capStatus,"Complete", "Withdrawn","Final")) updateAppStatus("Revoked","Revoked during inspection", childCaps[x]);
	}

if (wfTask == "Close Out" && matches(wfStatus,"Void")) {
	addStdCondition("General", "Record Locked");
	var appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask == "Close Out" && matches(wfStatus,"C of O")) {
	addStdCondition("General", "C of O Issued");
	var appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask == "Close Out" && matches(wfStatus,"C of O")  && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". Their C of O needs to be mailed to them");
	}

if (wfTask == "Close Out" && matches(wfStatus,"C of O") && appEmail!=null) {
	var retArr = DEV_LYNDA_WACHT.getPimaContactInfo(capId);
	var notificationParameters = new Object();
	notificationParameters.recordId=capId.getCustomID();
	notificationParameters.capAlias=cap.getCapType().getAlias();
	notificationParameters.appStatus=capStatus;
	notificationParameters.balanceDue=balanceDue;
	notificationParameters.toEmail=appEmail;
	notificationParameters.toCC="";
	notificationParameters.applicantName=retArr["applicant"];
	notificationParameters.phone=retArr["contPhone"];
	notificationParameters.acaUrl=retArr["contWebsite"];
	var parameters = aa.util.newHashMap();
	parameters.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Certificate of Occupancy", parameters, "AA_APPLICATION_STATUS", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	FEE_UTILS_MODULE.assessImpactFees();
	DEV_ACCELA_ENG_1.assessWallsFencesFee();
	}

FEE_UTILS_MODULE.WTUA_SiteConstructionBuildingFees();
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2 && AInfo['developmentConceptPlanIncluded'] == "Yes" && !feeExists("DS0072"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0072", "SITE CONSTRUCTION", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2 && AInfo['developmentConceptPlanIncluded'] == "No" && !feeExists("DS0079") && !FEE_UTILS_MODULE.doesAdhocTaskExist("Revisions"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0079", "SITE CONSTRUCTION", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0085") && !feeExists("DS0161") && !FEE_UTILS_MODULE.doesAdhocTaskExist("Revisions"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0161", "SITE CONSTRUCTION", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2 && feeExists("DS0086") && !feeExists("DS0162")  && !FEE_UTILS_MODULE.doesAdhocTaskExist("Revisions"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0162", "SITE CONSTRUCTION", "FInal", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2 && AInfo['landscapePlanNumberOfPlanSheets'] > 0 && feeExists("DS0074") && !feeExists("DS0076") && !FEE_UTILS_MODULE.doesAdhocTaskExist("Revisions"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0076", "SITE CONSTRUCTION", "Final", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (wfTask == "Invoicing" && wfStatus == "Assess Fees" && AInfo['numberOfSubmittals'] > 2 && AInfo['trafficImpactStudyOrTrafficMemorandum'] == "Yes" && !feeExists("DS0087") && !FEE_UTILS_MODULE.doesAdhocTaskExist("Revisions"))) {
	var numSubmittalsPastTwo = AInfo['numberOfSubmittals'] - 2;
	for (var i = 0;
	i < numSubmittalsPastTwo;
	i++) addFee("DS0087", "SITE CONSTRUCTION", "Final", 1, "N");
	}

if (((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId))) && AInfo['septicSewerReview']=="Sewer review required" && !appHasCondition("Associated Conditions", "Applied", "DS0110", null)) {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions","DS0110");
	}

if (((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId))) && AInfo['septicSewerReview']=="Septic review required" && !appHasCondition("Associated Conditions", "Applied", "DS0090", null)) {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "DS0090");
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
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

if (wfTask == "Review Consolidation" && wfStatus=="Denied") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Application Denial", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
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

var asit = loadASITable("PROXIMITY ALERT (APO)", capId);
if (typeof asit == "object" && asit.length > 0) var starValleyActive = asit[0]["Star Valley TRA"];
if (starValleyActive == "Y" && wfTask == "Invoicing" && wfStatus == "Assess Fees" && matches(AInfo['subTypeASI'], "Commercial Building New", "Multi-Family Residence New Building", "Single Family Residence New") && AInfo['feesApplicable'] == "Yes") {
	FEE_UTILS_MODULE.assessStarValleyFees(capId);
	}

if (matches(wfTask, "Routing") && matches(wfStatus, "In Review")) {
	assignTask("RFCD Floodplain Use Permit Review", "AA_RFCD_FLOODPLAIN");
	}

if (matches(wfTask, "Review Consolidation", "Review") && wfStatus=="Request for Corrections") {
	vEParams = aa.util.newHashtable();
	vRParams = aa.util.newHashtable();
	vEParams.put("$$altId$$",capId.getCustomID());
	vEParams.put("$$capAlias$$",cap.getCapType().getAlias());
	vEParams.put("$$appStatus$$",capStatus);
	vRParams.put("ALTID", capId.getCustomID());
	var vAsyncScript = "RUNREPORTEMAILASYNC";
	var envParameters = aa.util.newHashMap();
	envParameters.put("vCapId",capId);
	envParameters.put("vEventName","WorkflowTaskUpdateAfter");
	envParameters.put("vCurrentUserID",currentUserID);
	envParameters.put("vParentCapId",parentCapId);
	envParameters.put("vEParams",vEParams);
	envParameters.put("vRParams",vRParams);
	envParameters.put("vEmailTemplate","AA_APPLICATION_STATUS");
	envParameters.put("vContactTypes","Applicant");
	envParameters.put("vReportName","Notice of Request for Corrections");
	envParameters.put("vReportModule","BUILDING");
	aa.runAsyncScript(vAsyncScript, envParameters);
	}

if (wfTask == "Routing" && wfStatus == "In Review" && AInfo['IWC Review'] == "CHECKED") {
	UTILITYMODULE.sendIWCemail(capId);
	}

if (wfTask=="Invoicing" && wfStatus =="No Additional Fees Required" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	comment("Record could not auto-issue. There are assessed/invoiced fees on the record.");
	}


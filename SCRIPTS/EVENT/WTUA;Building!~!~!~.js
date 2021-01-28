//WTUA;Building!~!~!~
appEmail=null;
var chgRevPlans = -1;
var locked = false;
if (matches(wfTask, "Close Out", "Closeout") && matches(wfStatus, "Final", "C of O")) {
	locked = CONDITIONSMODULE.lockRecordsDetailed();
	}

if (matches(wfTask, "Close Out", "Closeout") && matches(wfStatus, "Complete", "Withdrawn", "Final", "C of O", "Revoked", "Void", "Issued", "Expired", "Denied", "Lock Record", "Superseded" ) && !locked) {
	addStdCondition("General", "Record Locked", capId);
	}

if ((specBldgRecd || appMatch("Building/Model/NA/NA")) && wfTask=="Invoicing" && wfStatus=="Invoice Fees") {
	branch("EMSE:InvoiceFeeNotification");
	}

if (specBldgRecd && wfTask=="Inspection" && wfStatus=="Revoked") {
	addStdCondition("Record Status", "Record Revoked", capId);
	var childRecs = getChildren("*/*/*/*");
	for (ii in childRecs) if(!DEV_LYNDA_WACHT.allTasksCompleteCapId("",childRecs[ii]) && !CONDITIONSMODULE.appHasConditionWCapId("Record Status", "Applied", "Record Revoked",null, childRecs[ii])) CONDITIONSMODULE.addStdConditionWCapId("Record Status", "Record Revoked",childRecs[ii]);
	}

if ((specBldgRecd || appMatch("Building/Revision/NA/NA")) && wfTask=="Admin Review" && wfStatus=="Deficient") {
	assignTask("Admin Review", "BackgroundGU");
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if ((specBldgRecd || appMatch("Building/Revision/NA/NA"))  && wfTask=="Admin Review" && wfStatus=="Deficient" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant" + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'Notice of Admin Review Deficiency'.");
	}

if ((specBldgRecd || appMatch("Building/Revision/NA/NA") || appMatch("Building/Model/NA/NA")) && wfTask=="Admin Review" && wfStatus=="Deficient" && appEmail!=null) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = "Deficient";
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "AA_NOTICE OF ADMIN REVIEW DEFICIENCY",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (specBldgRecd && wfTask=="Review Consolidation" && wfStatus == "Approved") {
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	}

if ((specBldgRecd || appMatch("Building/Revision/NA/NA")) && wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, null, null, "AA ADMIN COMPLETE",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}

var br = "<br>";
childArr = getChildren("Building/Revision/*/*");
cntChild=0;
if (childArr!=null && childArr!="") {
	if(childArr.length>0 && childArr.length<10) cntChild = "0" + childArr.length;
	if(childArr.length>=10) cntChild = "" + childArr.length;
	emailId= capId.getCustomID() + "-" +  cntChild;
	emailId= aa.cap.getCapID(emailId).getOutput();
	} else {
	emailId= capId;
	}

comment("130.5: " + capId.getCustomID());
if ((specBldgRecd || appMatch("Building/Model/NA/NA")) && wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(emailId, "General Permit", reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	setTask("Issuance", "N","Y");
	setTask("Inspection", "Y","N");
	if(appMatch("Building/Model/NA/NA"))  setTask("Close Out", "Y","N");
	}

comment("131.5: " + capId.getCustomID());
if (specBldgRecd && !appMatch("Building/ElecMech/NA/NA") && wfTask=="Invoicing" && wfStatus=="No Additional Fees Required"  && AInfo['zoningOnlyPermit']=="Yes"  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	closeTask("Inspection", "Not Required", "Closed via script","");
	}

if (specBldgRecd  && wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	comment("Permit has not been issued due to the following condition(s) having a 'Prior to Issuance' action: " + DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	}

if (wfTask=="Admin Review" && wfStatus == "Add Inspections") {
	addInspections=false;
	nbrAddInspectStatus= 0;
	workflowResult = aa.workflow.getTasks(capId);
	wfObj = workflowResult.getOutput();
	for (i in wfObj) if(wfObj[i].getTaskDescription()=="Admin Review" && wfObj[i].getDisposition()=="Add Inspections") nbrAddInspectStatus+=1;
	if ( specBldgRecd == true && nbrAddInspectStatus == 1 && wfTask=="Admin Review" && (wfStatus == "Add Inspections")) addInspections= true;
	if (addInspections==true) branch("EMSE:BuildingAutoAddInspections");
	}

if (specBldgRecd && wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	FEE_UTILS_MODULE.assessImpactFees();
	}

if (specBldgRecd && wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.assessGradingFee();
	DEV_ACCELA_ENG_1.assessNPPFee();
	}

if (specBldgRecd && !appMatch("Building/ElecMech/NA/NA") &&wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.assessWallsFencesFee();
	}

if ((specBldgRecd || appMatch("Building/Model/NA/NA")) && ((wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId))  || (wfTask=="Issuance" &&wfStatus=="Issued")) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	DEV_LYNDA_WACHT.changeDocCategory("Approved Pending Plan Set", "Approved Plan Set");
	DEV_LYNDA_WACHT.changeDocCategory("Approved Pending Revision Plan Set", "Approved Revision Plan Set");
	}

if (specBldgRecd && matches(wfTask, "Close Out","Closeout") && matches(wfStatus, "C of O")) {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (specBldgRecd && matches(wfTask, "Close Out","Closeout") && matches(wfStatus, "C of O") && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ( "Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". They need to be sent their Certificate of Occupancy.");
	}

if (specBldgRecd && matches(wfTask, "Close Out","Closeout") && matches(wfStatus, "C of O") && appEmail!=null) {
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
	notificationParameters.Dept=retArr["department"];
	var parameters = aa.util.newHashMap();
	parameters.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Certificate of Occupancy", parameters, "AA_APPLICATION_STATUS", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete") {
	var parAlt= getParent();
	if(parAlt) DEV_LYNDA_WACHT.processConditions(parAlt.getCustomID(), capId);
	}

if (specBldgRecd && ((wfTask == "Admin Review" && wfStatus == "Administratively Complete")) && AInfo['septicSewerReview']=="Septic review required" && !appHasCondition("Associated Conditions", "Applied", "DS0090", null)) {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions","DS0090");
	}

if (matches(AInfo['subTypeASI'], "Commercial Building New", "Commercial Building Addition")&& ((wfTask == "Admin Review" && wfStatus == "Administratively Complete")) && !appHasCondition("Associated Conditions", "Applied", "SC0070", null)) {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions","SC0070");
	}

if (specBldgRecd && wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.doubleFees();
	}

if (specBldgRecd && AInfo['subTypeASI'] != "Single Family Residence Alteration" && wfTask == "Invoicing" && wfStatus == "Assess Fees" && feeExists("DS0184","NEW")) {
	oldAmt = feeAmount("DS0184", "NEW");
	removeFee("DS0184", "FINAL");
	FEE_UTILS_MODULE.addFeeWithVersion("DS0184", "BUILDING", feeSchedVersion, "FINAL", oldAmt);
	}

if (specBldgRecd && AInfo['subTypeASI'] != "Single Family Residence Alteration" && wfTask == "Issuance" && wfStatus == "Issued" && lookup("SECTION10", "ACTIVATED")=="Yes") {
	S10_BLDG.createS10Child(capId);
	}

if (specBldgRecd && AInfo['subTypeASI'] != "Single Family Residence Alteration" && wfTask == "Invoicing" && wfStatus == "No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && lookup("SECTION10", "ACTIVATED")=="Yes") {
	S10_BLDG.createS10Child(capId);
	}

if (specBldgRecd && wfTask=="Issuance" && wfStatus=="Issued") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (specBldgRecd && wfTask=="Issuance" && wfStatus=="Issued" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  They need their permit mailed to them.");
	}

if (specBldgRecd && wfTask=="Issuance" && wfStatus=="Issued" && appEmail!=null) {
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
	notificationParameters.appStatus = "Issued";
	notificationParameters.address = UTILITYMODULE.getCapAddress(capId);
	notificationParameters.applicant = UTILITYMODULE.getContactName("Applicant");
	var parameters = aa.util.newHashMap();
	parameters.put("PermitNumber", capId.getCustomID());
	var parameters = aa.util.newHashMap();
	parameters.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "General Permit", parameters, "AA_GENERAL_PERMIT", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "WTUA", null);
	}

if ((wfTask=="Issuance" && wfStatus=="Issued") && (appMatch("Building/Buildings/NA/NA") || appMatch("Building/Manufactured/NA/NA") || appMatch("Building/ElecMech/NA/NA")) && (SEWER_CONNECTION_FUNCTIONS.spawningPrereq(capId))) {
	UTILITYMODULE.spawnSewerConnectionChild(capId);
	}

if (specBldgRecd && matches( wfTask, "Review Consolidation", "Review") && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections",  reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if ((specBldgRecd || appMatch("Building/Model/NA/NA")) && matches( wfTask, "Review Consolidation", "Review")  && wfStatus == "Denied") {
	UTILITYMODULE.emailReportAsync(capId, null, "WorkflowTaskUpdateAfter", "AA_APPLICATION_STATUS", "Applicant", "Notice of Application Denial", "BUILDING");
	}

if (specBldgRecd && !appMatch("Building/ElecMech/NA/NA") && wfTask == "Issuance" && wfStatus == "Issued" && AInfo['zoningOnlyPermit']=="Yes"  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	closeTask("Inspection", "Not Required", "Closed via script","");
	}

comment("380: " + capId.getCustomID());
if ((wfTask, "Close Out", "Closeout") && matches (wfStatus, "Withdrawn", "Void")) {
	closeTask("RFCD AD Hoc Review", "Withdrawn", "Updated Via Script", null);
	}

if (specBldgRecd && !appMatch("Building/ElecMech/NA/NA") && balanceDue<=0 && AInfo['zoningOnlyPermit']=="Yes" && isTaskActive("Close Out")) {
	closeTask("Close Out", "Final", "Updated via script","");
	updateAppStatus("Final", "Updated via script");
	addStdCondition("General", "Record Finaled", capId);
	}

if (specBldgRecd && !appMatch("Building/ElecMech/NA/NA") && AInfo['zoningOnlyPermit']=="Yes" && matches(wfStatus, "Withdrawn", "Void", "Denied")) {
	closeTask("Close Out", wfStatus, "Updated via script","");
	updateAppStatus(wfStatus, "Updated via script");
	addStdCondition("General", "Record Locked", capId);
	}

if (matches(wfTask, "RFCD Drainage Review", "RFCD Riparian Review", "RFCD Water Conservation Review", "RFCD Review") && !matches(wfStatus, "Note", "Additional Information", "Additional Comments")) {
	if (wfTask == "RFCD Review") assignTask(wfTask,"AA_RFCD_FPUP");
	if (wfTask == "RFCD Riparian Review") assignTask(wfTask,"AA_RFCD_RIPARIAN");
	if (matches(wfTask, "RFCD Drainage Review", "RFCD Water Conservation Review")) assignTask(wfTask,"AA_RFCD_DRAINAGE");
	}

if ((specBldgRecd || appMatch("Building/DamageDemo/NA/NA") )    && ((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId))  ||  (wfTask == "Close Out" && matches(wfStatus, "Final", "C of O")))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if (wfTask == "Routing" && wfStatus == "In Review") {
	assignTask("RWRD IWC Review", "AA_RWRD_IWC");
	}

if (wfTask=="Invoicing" && wfStatus =="No Additional Fees Required" && FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) {
	comment("Record could not auto-issue. There are assessed/invoiced fees on the record.");
	}

if ((appTypeString == "Building/Buildings/NA/NA" || appTypeString == "Building/Manufactured/NA/NA" || appTypeString == "Building/ElecMech/NA/NA")) {
	BLUE_BONNET_FUNCTIONS.ASAWTUABuilding(capId);
	}

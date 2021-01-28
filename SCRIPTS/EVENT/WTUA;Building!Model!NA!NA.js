//WTUA;Building!Model!NA!NA
appEmail =null;
if (wfTask=="Review" && wfStatus == "Approved") {
	editAppSpecific("applicationExpiration", (dateAddMonths(null, 12)));
	}

if (wfTask=="Admin Review" && wfStatus=="Deficient") {
	assignTask("Admin Review", "BackgroundGU");
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Admin Review" && wfStatus=="Deficient" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant" + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'Notice of Admin Review Deficiency'.");
	}

if (wfTask=="Admin Review" && wfStatus=="Deficient" && appEmail!=null) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = "Deficient";
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "AA_NOTICE OF ADMIN REVIEW DEFICIENCY",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete") {
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant" + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'AA ADMIN COMPLETE.");
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete" && appEmail!=null) {
	var templateParameters = new Object();
	templateParameters.altId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	templateParameters.address = UTILITYMODULE.getCapAddress(capId);
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(appEmail,sysFromEmail,"","AA ADMIN COMPLETE",templateParameters,null);
	}

if (wfTask=="Issuance" && wfStatus=="Issued" && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = "Issued";
	UTILITYMODULE.sendEmail(capId, "Model Plan Approval", reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && childGetByCapType("Building/Model Template/*/*")) {
	childCap = childGetByCapType("Building/Model Template/*/*");
	copyAppSpecific(childCap);
	removeASITable("SITE BUILT BUILDINGS", childCap);
	copyASITables(capId,childCap);
	editAppSpecific("modelPlanExpiration", AInfo['permitExpiration'], childCap);
	DEV_LYNDA_WACHT.addAllConditionsToExistingChildren();
	INSPECTIONMODULE.deleteInspsOnCap(childCap, "Y", "Y");
	DEV_LYNDA_WACHT.copySchedInspAsPending(capId, childCap);
	}

if (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required"  && !childGetByCapType("Building/Model Template/*/*")) {
	comment("1: " + capId.getCustomID());
	var myName="";
	if(capName!=null) myName=capName;
	comment("2: " + capId.getCustomID());
	childCap=createChild("Building", "Model Template", AInfo['modelType'],"NA",myName);
	comment("3: " + capId.getCustomID());
	copyAppSpecific(childCap);
	copyASITables(capId,childCap);
	aa.cap.updateCapAltID(childCap, capId.getCustomID() + "T");
	updateAppStatus("Approved for Use","Updated via script",childCap);
	editAppSpecific("modelPlanExpiration", AInfo['permitExpiration'], childCap);
	DEV_LYNDA_WACHT.addAllConditionsToExistingChildren();
	DEV_LYNDA_WACHT.copySchedInspAsPending(capId, childCap);
	}

if (wfTask=="Invoicing" && wfStatus=="Assess Fees") {
	FEE_UTILS_MODULE.assessBldgModelFees();
	}

if (wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.doubleFees();
	}

if (wfTask=="Issuance" && wfStatus=="Issued" && childGetByCapType("Building/Model Template/*/*")) {
	childCap = childGetByCapType("Building/Model Template/*/*");
	copyAppSpecific(childCap);
	removeASITable("SITE BUILT BUILDINGS", childCap);
	copyASITables(capId,childCap);
	editAppSpecific("modelPlanExpiration", AInfo['permitExpiration'], childCap);
	DEV_LYNDA_WACHT.addAllConditionsToExistingChildren();
	INSPECTIONMODULE.deleteInspsOnCap(childCap, "Y", "Y");
	DEV_LYNDA_WACHT.copySchedInspAsPending(capId, childCap);
	}

if (wfTask=="Issuance" && wfStatus=="Issued" && !childGetByCapType("Building/Model Template/*/*")) {
	var myName="";
	if(capName!=null) myName=capName;
	childCap=createChild("Building", "Model Template", AInfo['modelType'],"NA",myName);
	copyAppSpecific(childCap);
	copyASITables(capId,childCap);
	aa.cap.updateCapAltID(childCap, capId.getCustomID() + "T");
	updateAppStatus("Approved for Use","Updated via script",childCap);
	editAppSpecific("modelPlanExpiration", AInfo['permitExpiration'], childCap);
	DEV_LYNDA_WACHT.addAllConditionsToExistingChildren();
	DEV_LYNDA_WACHT.copySchedInspAsPending(capId, childCap);
	}

if (wfTask=="Review" && wfStatus=="Denied") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Review" && wfStatus=="Denied" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant" + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'Notice of Application Denial'.");
	}

if (wfTask=="Review" && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice Request for Corrections_AllSingleReview",  reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if ((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask == "Invoicing"  && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}
//WTUA;Site!~!~!~
var locked = false;
if (matches(wfTask, "Close Out", "Closeout") && matches(wfStatus, "Final", "C of O")) {
	locked = CONDITIONSMODULE.lockRecordsDetailed();
	}

if (matches(wfTask, "Close Out", "Closeout") && matches(wfStatus, "Complete", "Withdrawn", "Issued", "Final", "Expired", "Void", "Ineligible", "Previously Executed", "Lock Record","Existing Coverage") && !locked) {
	addStdCondition("General", "Record Locked");
	}

if (matches(appTypeArray[1],"Site Construction Building","Development Concept Permit","Site Construction","Tentative Plat") && AInfo['sewerConnectionWaiverRequest']=="Yes" && wfTask=="Admin Review"&& wfStatus =="Administratively Complete") {
	parentCapId = capId;
	var childCap =createChild("Site", "Sewer Waiver Request", "NA","NA", capName);
	capId=childCap;
	closeTask("Application Intake","Submitted", "Application successfully submitted", "Closed via Script");
	capId=parentCapId;
	}

if (matches(appTypeArray[1], "Site Construction Building","Site Construction", "Development Concept Permit", "Tentative Plat", "Sewer Connection Permit") && wfTask=="Invoicing" && wfStatus=="Invoice Fees") {
	branch("EMSE:InvoiceFeeNotification");
	}

if (matches(appTypeArray[1],"Development Concept Permit","Site Construction Building","Site Construction","Tentative Plat","Final Plat")) {
	parallelActive = 0;
	parallelTasks = ["Assessor Office Review","DEQ Sewer Review","DOT Off-site Right of Way Review","DOT Off-site Right-of-Way Review","DOT Off-Site Right-of-Way Review","DOT Traffic Engineering Review","DOT Trafic Engineering Review", "DSD Building Review","DSD Planning Review","DSD Septic Review","DSD Site Review","NRPR Review","OSC Cultural Resources Review","OSC Environmental Planning Review","RFCD Drainage Review","RFCD Floodplain Use Permit Review","RFCD Riparian Review","RFCD Water Conservation Review","RPS Review","RWRD IWC Review","RWRD PSL Review","Riparian/Water Conservation Review","DOT Right-of-Way Review"];
	for (x in parallelTasks) if(isTaskActive(parallelTasks[x])) parallelActive+=1;
	}

if (matches(appTypeArray[1],"Development Concept Permit","Site Construction Building","Site Construction","Tentative Plat","Final Plat") && ((matches(wfStatus,"Approved","Request for Corrections","Denied","Withdrawn") && parallelTasks.indexOf(""+wfTask) >= 0))&& parallelActive == 0) {
	var getTaskSpec = AInfo['numberOfSubmittals'];
	var numberSubmit = Number(getTaskSpec);
	if(!numberSubmit > 0) numberSubmit = 0;
	numberSubmit+=1;
	editTaskSpecific("Review Consolidation","numberOfSubmittals",numberSubmit);
	}

if (wfTask=="Admin Review" && wfStatus=="Administratively Complete") {
	var parAlt= getParent();
	if(parAlt) DEV_LYNDA_WACHT.processConditions(parAlt.getCustomID(), capId);
	}

if ((appMatch("Site/Site Construction Building/NA/NA") || appMatch("Site/Site Construction/NA/NA") || appMatch("Site/Development Concept Permit/NA/NA")) && wfTask == "Invoicing" && wfStatus == "Assess Fees") {
	DEV_ACCELA_ENG_1.doubleFees();
	}

if ((appMatch("Site/Site Construction Building/NA/NA") || appMatch("Site/Site Construction/NA/NA") || appMatch("Site/Development Concept Permit/NA/NA")) && wfTask == "Invoicing" && wfStatus == "Assess Fees" && feeExists("DS0184","NEW")) {
	oldAmt = feeAmount("DS0184", "NEW");
	removeFee("DS0184", "FINAL");
	FEE_UTILS_MODULE.addFeeWithVersion("DS0184", "BUILDING", feeSchedVersion, "FINAL", oldAmt);
	}

if (matches(appTypeArray[1], "Development Concept Permit","Site Construction","Tentative Plat","Final Plat") && wfTask=="Review Consolidation" && wfStatus=="Request for Corrections") {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (matches(appTypeArray[1], "Development Concept Permit","Site Construction","Tentative Plat","Final Plat") && wfTask=="Review Consolidation"  && wfStatus=="Request for Corrections" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant"))comment ("Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " +contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'Notice of Request for Corrections'.");
	}

if (matches(wfTask, "RFCD Drainage Review", "RFCD Riparian Review", "RFCD Water Conservation Review", "RFCD Review") && !matches(wfStatus, "Note", "Additional Information", "Additional Comments")) {
	if (wfTask == "RFCD Review") assignTask(wfTask,"AA_RFCD_FPUP");
	if (wfTask == "RFCD Riparian Review") assignTask(wfTask,"AA_RFCD_RIPARIAN");
	if (matches(wfTask, "RFCD Drainage Review")) assignTask(wfTask,"AA_RFCD_DRAINAGE");
	}

if (matches(wfTask, "Routing") && matches(wfStatus, "In Review")) {
	assignTask("RFCD Drainage Review", "AA_RFCD_DRAINAGE");
	assignTask("RFCD Riparian Review", "AA_RFCD_RIPARIAN");
	}

if ((appMatch("Site/Development Concept Permit/NA/NA") || appMatch("Site/Site Construction/NA/NA") || appMatch("Site/Site Construction Building/NA/NA")) && ((wfTask == "Issuance" && wfStatus == "Issued") || (wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if ((appMatch("Site/Development Concept Permit/NA/NA") || appMatch("Site/Site Construction/NA/NA") || appMatch("Site/Site Construction Building/NA/NA")) && ((wfTask == "Close Out" && matches(wfStatus, "C of O", "Final")))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if (wfTask == "Routing" && wfStatus == "In Review") {
	assignTask("RWRD IWC Review", "AA_RWRD_IWC");
	}

if ((appTypeString == "Site/Site Construction Building/NA/NA" || appTypeString == "Site/Sewer Connection Permit/NA/NA")) {
	BLUE_BONNET_FUNCTIONS.ASAWTUASite(capId);
	}


//WTUA;Building!Revision!~!~
if (wfTask == "Review Consolidation" && matches(wfStatus, "Approved", "Denied")) {
	closeTask("Close Out", "Complete", "Status is " + wfStatus, "Closed via script");
	addStdCondition("General", "Record Locked", capId);
	var parAltId = getParent();
	var currCapId = capId;
	capId = parAltId;
	activateTask("Invoicing");
	var capModel = aa.cap.getCap(capId).getOutput().getCapModel();
	var recordId = capModel.getAltID();
	var recordAlias = capModel.getAppTypeAlias();
	var GU = "AA_DSD_BUILDING";
	if (recordAlias == "Site Construction") GU = "AA_DSD_SITE";
	assignTask("Invoicing", GU);
	WFMODULE.closeAdHocTask("Revisions", "Complete", "Revisions Complete", "");
	capId = currCapId;
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (wfTask=="Review Consolidation" && wfStatus=="Denied" && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". The phone number is: " + contArray[x]["phone1"] + ". The notification they need is 'AA_APPLICATION_STATUS.");
	}

if (wfTask=="Review Consolidation" && wfStatus=="Denied" && appEmail!=null) {
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	retArr = DEV_LYNDA_WACHT.getPimaContactInfo(capId);
	templateParameters.deptPhone = retArr["contPhone"];
	templateParameters.deptWebsite = retArr["contWebsite"];
	templateParameters.department = retArr["department"];
	templateParameters.recordAlias = retArr["recordAlias"];
	templateParameters.applicant = retArr["applicant"];
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(appEmail,sysFromEmail,"","AA_APPLICATION_STATUS",templateParameters,null);
	}

if (wfTask== "Review Consolidation" && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections",  reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant", cap.getCapType().getAlias(), "WTUA", null);
	}

if (wfTask == "Routing" && wfStatus == "In Review" && AInfo['IWC Review'] == "CHECKED") {
	UTILITYMODULE.sendIWCemail(capId);
	}

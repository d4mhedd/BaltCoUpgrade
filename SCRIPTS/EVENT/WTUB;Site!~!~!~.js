//WTUB;Site!~!~!~
var feesToInvoice = false;
feesDue=false;
if (wfTask=="Close Out" && matches(wfStatus, "Final","Withdrawn") && balanceDue > 0) {
	showMessage=true;
	comment("Record cannot be closed until all fees are paid.");
	cancel=true;
	}

if (wfTask=="Close Out" && matches(wfStatus, "Final","Withdrawn")) {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) if(allFees[x]["status"] == "NEW") feesToInvoice=true;
	}

if (wfTask=="Close Out" && matches(wfStatus, "Final","Withdrawn") && feesToInvoice) {
	cancel= true;
	comment("There are fees to invoice. Please invoice and pay all appropriate fees before continuing.");
	}

if (wfTask=="Invoicing" && wfStatus=="Invoice Fees" && matches(appTypeArray[1],"Development Concept Permit","Tentative Plat","Final Plat","Site Construction Building", "Site Construction", "Sewer Connection Permit")) {
	branch("EMSE:noFeesToInvoiceMessage");
	}

if (matches(appTypeArray[1],"Tentative Plat", "Final Plat","Site Construction Building","Site Construction") && matches(wfTask,"Mylar Received", "Issuance") && matches (wfStatus,"Issued","BOS Schedule") && balanceDue > 0) {
	showMessage=true;
	comment("Record cannot be closed until all fees are paid.");
	cancel=true;
	}

if (matches(appTypeArray[1],"Tentative Plat", "Final Plat","Site Construction Building","Site Construction")&& matches(wfTask,"Mylar Received", "Issuance") && matches (wfStatus,"Issued","BOS Schedule")) {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) if(allFees[x]["status"] == "NEW") feesToInvoice=true;
	}

if (matches(appTypeArray[1],"Tentative Plat", "Final Plat","Site Construction Building","Site Construction")&& matches(wfTask,"Mylar Received", "Issuance") && matches (wfStatus,"Issued","BOS Schedule")   && !feesToInvoice) {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) feeSum+= allFees[x]["amount"] - allFees[x]["amountPaid"];
	if(feeSum > 0) feesDue = true;
	}

if (matches(appTypeArray[1],"Tentative Plat", "Final Plat", "Site Construction Building","Site Construction") &&matches(wfTask,"Issuance","Mylar Received") && matches (wfStatus,"BOS Schedule","Issued") && !feesToInvoice && feesDue) {
	cancel= true;
	comment("There are no fees to invoice and no fees due. Please assess all appropriate fees before invoicing");
	}

if (matches(appTypeArray[1],"Tentative Plat", "Final Plat", "Site Construction Building","Site Construction") &&matches(wfTask,"Issuance","Mylar Received") && matches (wfStatus,"BOS Schedule","Issued") && !feesToInvoice && feesDue) {
	cancel= true;
	comment("There are no fees to invoice, but there are fees due. Please verify invoiced fees before continuing");
	}

var chkLim = new Array();
chkLim = DEV_LYNDA_WACHT.checkConditionLimiters("WTUB");
if (chkLim[0]=="Cancel") {
	showMessage=true;
	comment(chkLim[1]);
	cancel=true;
	}

if (cancel == false && wfTask=="Review Consolidation" && wfStatus=="Request for Corrections" && !matches(appTypeArray[1],"Site Construction Building", "Site Construction", "Development Concept Permit")) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections", reportParams, "AA_ADMIN COMPLETE ASI EXPIRATION DATE",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUB", null);
	}

if (wfTask == "Application Intake") {
	var history = aa.workflow.getHistory(capId);
	var success = history.getSuccess();
	var isRequestForCorrections = false;
	}

if (wfTask == "Application Intake" && success) {
	wfHistory = history.getOutput();
	for (x in wfHistory) if (wfHistory[x].getDisposition() == "Request for Corrections") isRequestForCorrections = true;
	}

if (wfTask == "Application Intake" && wfStatus == "Submitted" && isRequestForCorrections) {
	showMessage = true;
	comment("<b><font color=RED>If this record was requested for corrections please submit the status as \"Resubmit\"</font></b>");
	cancel=true;
	}

if ((appTypeString == "Site/Site Construction Building/NA/NA" || appTypeString == "Site/Sewer Connection Permit/NA/NA")) {
	BLUE_BONNET_FUNCTIONS.WTUBSite(capId);
	}


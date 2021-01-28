//WTUB;Building!~!~!~
var feesToInvoice = false;
feesDue=false;
if (wfTask=="Close Out" && wfStatus=="Issued C of O" && balanceDue > 0) {
	cancel=true;
	comment("Status cannot be set to 'Issued C of O' until all fees have been paid.");
	}

if (wfTask=="Invoicing" && wfStatus=="Invoice Fees") {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) if(allFees[x]["status"] == "NEW") feesToInvoice=true;
	}

if (wfTask=="Invoicing" && wfStatus=="Invoice Fees" && !feesToInvoice) {
	var feeSum=0;
	allFees = loadFees();
	for (x in allFees) feeSum+= allFees[x]["amount"] - allFees[x]["amountPaid"];
	if(feeSum > 0) feesDue = true;
	}

if (wfTask=="Invoicing" && wfStatus=="Invoice Fees" && !feesToInvoice && !feesDue) {
	cancel= true;
	comment("There are no fees to invoice and no fees due. Please assess all appropriate fees before invoicing");
	}

if (wfTask=="Invoicing" && wfStatus=="Invoice Fees" && !feesToInvoice && feesDue) {
	cancel= true;
	comment("There are no fees to invoice, but there are fees due. Please verify invoiced fees before continuing");
	}

if (specBldgRecd && wfTask=="Issuance" && wfStatus=="Issued" && balanceDue > 0) {
	showMessage=true;
	comment("Balance must be paid before permit can be issued.");
	cancel=true;
	}

if (wfTask == "Close Out" && matches(wfStatus, "C of O","Certification Achieved","Certification Not Achieved","Complete","Denied","Document Sent","Expired","Final","Issued","Issued C of O","Withdrawn") && balanceDue > 0) {
	showMessage=true;
	comment("Record cannot be closed until all fees have been paid.");
	cancel=true;
	}

if ((specBldgRecd || appMatch("Building/Model/NA/NA")) && wfTask=="Invoicing" && wfStatus=="Invoice Fees" && feesToInvoice) {
	FEE_UTILS_MODULE.invoiceAllFees();
	}

var chkLim = new Array();
chkLim = DEV_LYNDA_WACHT.checkConditionLimiters("WTUB");
if (chkLim[0]=="Cancel") {
	showMessage=true;
	comment(chkLim[1]);
	cancel=true;
	}

if (specBldgRecd && wfTask == "Issuance" && wfStatus == "Issued" && matches(AInfo['permitExpiration'],"",null)) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,12)));
	}

if ((specBldgRecd || appMatch("Building/Revision/NA/NA")) && wfTask == "Admin Review" && wfStatus == "Administratively Complete") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Administrative Completeness Review", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if ((specBldgRecd || appMatch("Building/Model/NA/NA")) && wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId) && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() && matches(AInfo['permitExpiration'],"",null)) {
	WFMODULE.updateTaskPima("Issuance", "Issued","Successfully issued", "Closed via script");
	editAppSpecific("permitExpiration",(dateAddMonths(null,12)));
	message="";
	}

if (specBldgRecd && matches( wfTask, "Review Consolidation", "Review") && wfStatus=="Request for Corrections") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Request for Corrections", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if ((specBldgRecd || appMatch("Building/Revision/NA/NA") || appMatch("Building/Model/NA/NA")) && wfTask=="Admin Review" && wfStatus=="Deficient") {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Notice of Admin Review Deficiency", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

if (specBldgRecd && matches(wfTask, "Close Out","Closeout") && matches(wfStatus, "C of O")) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("ALTID", capId.getCustomID());
	var templateParameters = new Object();
	templateParameters.recordId = capId.getCustomID();
	templateParameters.appStatus = capStatus;
	UTILITYMODULE.sendEmail(capId, "Certificate of Occupancy", reportParams, "AA_APPLICATION_STATUS",templateParameters, "Applicant",  cap.getCapType().getAlias(), "WTUB", null);
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

if ((appTypeString == "Building/Buildings/NA/NA" || appTypeString == "Building/Manufactured/NA/NA" || appTypeString == "Building/ElecMech/NA/NA")) {
	BLUE_BONNET_FUNCTIONS.WTUBBuilding(capId);
	}

if ((cancel==false)  && (specBldgRecd) && ((wfTask=="Invoicing" && wfStatus=="No Additional Fees Required" && !FEE_UTILS_MODULE.existOustandingAssessedOrInvoicedFees(capId)) || ( wfTask=="Issuance" && wfStatus=="Issued"))) {
	var reportParams = aa.util.newHashMap();
	reportParams.put("PermitNumber", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "General Permit", reportParams, "","", "Applicant", cap.getCapType().getAlias(), "WTUB", null);
	}

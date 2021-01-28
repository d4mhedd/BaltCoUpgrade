//PRA;Building!Model!~!~
var okToIssue = false;
if (balanceDue<=0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	okToIssue = true;
	}

if (okToIssue) {
	vEParams = aa.util.newHashtable();
	vRParams = aa.util.newHashtable();
	}

if (okToIssue) {
	vEParams.put("$$recordId$$",capId.getCustomID());
	}

if (okToIssue) {
	vEParams.put("$$appStatus$$","Issued");
	}

if (okToIssue) {
	vRParams.put("PermitNumber", capId.getCustomID());
	}

if (okToIssue) {
	var vAsyncScript = "RUNREPORTEMAILASYNC";
	}

if (okToIssue) {
	var envParameters = aa.util.newHashMap();
	}

if (okToIssue) {
	envParameters.put("vCapId",capId);
	}

if (okToIssue) {
	envParameters.put("vEventName","PaymentRecieveAfter");
	}

if (okToIssue) {
	envParameters.put("vCurrentUserID",currentUserID);
	}

if (okToIssue) {
	envParameters.put("vParentCapId",parentCapId);
	}

if (okToIssue) {
	envParameters.put("vEParams",vEParams);
	}

if (okToIssue) {
	envParameters.put("vRParams",vRParams);
	}

if (okToIssue) {
	envParameters.put("vEmailTemplate","AA_ADMIN COMPLETE ASI EXPIRATION DATE");
	}

if (okToIssue) {
	envParameters.put("vContactTypes","Applicant");
	}

if (okToIssue) {
	envParameters.put("vReportName","Model Plan Approval");
	}

if (okToIssue) {
	envParameters.put("vReportModule","BUILDING");
	}

if (okToIssue) {
	aa.runAsyncScript(vAsyncScript, envParameters);
	}

if (okToIssue && UTILITYMODULE.getContactEmail("Applicant") == false) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  They need their permit mailed to them.");
	}

if (okToIssue) {
	revisionArray = new Array();
	revisionArray = getChildren("Building/Revision/*/*", capId);
	}

if (okToIssue && (revisionArray == null || !revisionArray.length)) {
	editAppSpecific("permitExpiration",dateAddMonths(null,36));
	}

if (okToIssue && childGetByCapType("Building/Model Template/*/*")) {
	childCap = childGetByCapType("Building/Model Template/*/*");
	copyAppSpecific(childCap);
	removeASITable("SITE BUILT BUILDINGS", childCap);
	}

if (okToIssue && childGetByCapType("Building/Model Template/*/*")) {
	copyASITables(capId,childCap);
	editAppSpecific("modelPlanExpiration", AInfo['permitExpiration'], childCap);
	DEV_LYNDA_WACHT.addAllConditionsToExistingChildren();
	INSPECTIONMODULE.deleteInspsOnCap(childCap, "Y", "Y");
	DEV_LYNDA_WACHT.copySchedInspAsPending(capId, childCap);
	}

if (okToIssue && !childGetByCapType("Building/Model Template/*/*")) {
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

if (okToIssue) {
	closeTask("Issuance","Issued","Closed via script");
	}

if (feeBalance("DS0105") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("DS0105", "INVOICED") && childGetByCapType("Building/Model Template/*/*")) {
	childCap = childGetByCapType("Building/Model Template/*/*");
	DEV_ACCELA_ENG_1.completeRenewal();
	editAppSpecific("modelPlanExpiration", AInfo['permitExpiration'], childCap);
	}

if (feeBalance("DS0105") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("DS0105", "INVOICED") && !childGetByCapType("Building/Model Template/*/*")) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}

if (okToIssue) {
	setTask("Issuance", "N","Y");
	setTask("Inspection", "Y","N");
	if(appMatch("Building/Model/NA/NA"))  setTask("Close Out", "Y","N");
	}

PRA;Building!Oversize Overweight Vehicle!NA!NA
if (balanceDue<=0 && isTaskActive("Issuance")) {
	setTask("Issuance", "N","Y");
	setTask("Close Out", "Y","N");
	}

var reportParams = aa.util.newHashMap();
reportParams.put("PermitNumber", capId.getCustomID());
var templateParameters = new Object();
templateParameters.altId = capId.getCustomID();
templateParameters.appStatus = "Issued";
templateParameters.address = UTILITYMODULE.getCapAddress(capId);
UTILITYMODULE.sendEmail(capId, "Oversize-Overweight Permit", reportParams, "AA_GENERAL_PERMIT_OVERSIZE",templateParameters, "Applicant", "Oversize Overweight Vehicle", "WTUA", null);

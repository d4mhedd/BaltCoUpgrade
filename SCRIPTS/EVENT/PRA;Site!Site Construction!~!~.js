//PRA;Site!Site Construction!~!~
if (balanceDue <= 0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() &&  !UTILITYMODULE.hasBuildingRevisionChild(capId)) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,36)));
	//updateTask("Issuance","Issued","Closed via script", "");
	}

var appEmail;
if (DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	comment("Permit has not been issued due to the following condition(s) having a 'Prior to Issuance' action: " + DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	}

if (feeBalance("DS0093") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("DS0093", "INVOICED")) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}

if (balanceDue==0 && isTaskActive("Issuance")&& !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	DEV_LYNDA_WACHT.changeDocCategory("Site Construction Drawings", "Approved Site Construction Drawings");
	DEV_LYNDA_WACHT.changeDocCategory("Revision Plan Set", "Approved Revision Plan Set");
	}

if (balanceDue==0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (balanceDue==0 && isTaskActive("Issuance") && appEmail==null  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  They need their permit mailed to them.");
	}

if (balanceDue==0 && isTaskActive("Issuance") && appEmail!=null && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
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
	}

if (balanceDue==0 && isTaskActive("Issuance") && appEmail!=null && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	vEParams = aa.util.newHashtable();
	vRParams = aa.util.newHashtable();
	vEParams.put("$$altId$$",capId.getCustomID());
	vEParams.put("$$appStatus$$","Issued");
	vEParams.put("$$capAlias$$",cap.getCapType().getAlias());
	vEParams.put("$$address$$",UTILITYMODULE.getCapAddress(capId));
	vRParams.put("PermitNumber", capId.getCustomID());
	var vAsyncScript = "RUNREPORTEMAILASYNC";
	var envParameters = aa.util.newHashMap();
	envParameters.put("vCapId",capId);
	envParameters.put("vEventName","PaymentRecieveAfter");
	envParameters.put("vCurrentUserID",currentUserID);
	envParameters.put("vParentCapId",parentCapId);
	envParameters.put("vEParams",vEParams);
	envParameters.put("vRParams",vRParams);
	envParameters.put("vEmailTemplate","AA_GENERAL_PERMIT");
	envParameters.put("vContactTypes","Applicant");
	envParameters.put("vReportName","General Permit");
	envParameters.put("vReportModule","BUILDING");
	aa.runAsyncScript(vAsyncScript, envParameters);
	}

if (balanceDue==0 && isTaskActive("Issuance") && appEmail!=null && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()&& UTILITYMODULE.getContactEmail("Applicant") == false) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  They need their permit mailed to them.");
	}

if (balanceDue==0 && isTaskActive("Issuance")&& !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	closeTask("Issuance", "Issued", "closed via script");
	}

if (balanceDue==0 && isTaskActive("Issuance")  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	setTask("Issuance", "N","Y");
	setTask("Inspection", "Y","N");
	setTask("GIS Update", "Y","N");
	}
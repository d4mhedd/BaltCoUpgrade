//PRA;Site!Tentative Plat!~!~
if (feeBalance("DS0092") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("DS0092", "INVOICED")) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}

if (balanceDue <= 0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	updateTask("Issuance", "Issued", "Updated via script: PRA:Site/Tentative Plat/*/*", "");
	updateAppStatus("Issued", "Updated via script: PRA:Site/Tentative Plat/*/*");
	}

revisionArray = new Array();
revisionArray = getChildren("Building/Revision/*/*", capId);
if (DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	comment("Permit has not been issued due to the following condition(s) having a 'Prior to Issuance' action: " + DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	}

if (balanceDue<=0 &&  isTaskActive("Issuance")  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	var retArr = DEV_LYNDA_WACHT.getPimaContactInfo(capId);
	var notificationParameters = new Object();
	notificationParameters.altId=UTILITYMODULE.getChildEmailAltIdIfAvailable(capId);
	notificationParameters.capAlias=cap.getCapType().getAlias();
	notificationParameters.capStatus=capStatus;
	notificationParameters.balanceDue=balanceDue;
	notificationParameters.toEmail=appEmail;
	notificationParameters.toCC="";
	notificationParameters.applicantName=retArr["applicant"];
	notificationParameters.phone=retArr["contPhone"];
	notificationParameters.Dept=retArr["department"];
	}

if (balanceDue<=0 &&  isTaskActive("Issuance")  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	vEParams = aa.util.newHashtable();
	vRParams = aa.util.newHashtable();
	vEParams.put("$$altId$$",capId.getCustomID());
	vEParams.put("$$appStatus$$","Issued");
	vEParams.put("$$address$$", UTILITYMODULE.getCapAddress(capId));
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

if (balanceDue<=0 &&  isTaskActive("Issuance")  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() && UTILITYMODULE.getContactEmail("Applicant") == false) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  They need their permit mailed to them.");
	}

if (balanceDue<=0 &&  isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	setTask("Issuance", "N","Y");
	setTask("GIS Update", "Y","N");
	}

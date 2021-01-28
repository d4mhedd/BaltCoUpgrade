//PRA;Building!~!~!~
if ((specBldgRecd || appMatch("Building/DamageDemo/NA/NA") || appMatch("Building/Construction Noise Permit/NA/NA") || appMatch("Building/Registered Plant/NA/NA")) && balanceDue <= 0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	updateTask("Issuance", "Issued", "Updated via script: PRA:Building/*/*/*", "");
	updateAppStatus("Issued", "Updated via script: PRA:Building/*/*/*");
	}

revisionArray = new Array();
revisionArray = getChildren("Building/Revision/*/*", capId);
if ((specBldgRecd || appMatch("Building/DamageDemo/NA/NA") || appMatch("Building/Construction Noise Permit/NA/NA")) && balanceDue <= 0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() && (revisionArray == null || !revisionArray.length)) {
	editAppSpecific("permitExpiration",(dateAddMonths(null,12)));
	}

if (DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	comment("Permit has not been issued due to the following condition(s) having a 'Prior to Issuance' action: " + DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	}

if (!appMatch("Building/Model/NA/NA") && UTILITYMODULE.isAdhocTaskActive("Renewal") && ((feeBalance("DS0105") == 0  && feeExists("DS0105", "INVOICED")) || (feeBalance("DS0165") == 0 && feeExists("DS0165", "INVOICED")))) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}

if ((specBldgRecd || appMatch("Building/DamageDemo/NA/NA") || appMatch("Building/Construction Noise Permit/NA/NA") || appMatch("Building/Registered Plant/NA/NA")) && balanceDue<=0 &&  isTaskActive("Issuance")  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
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

if ((specBldgRecd || appMatch("Building/DamageDemo/NA/NA") || appMatch("Building/Construction Noise Permit/NA/NA") || appMatch("Building/Registered Plant/NA/NA")) && balanceDue<=0 &&  isTaskActive("Issuance")  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	vEParams = aa.util.newHashtable();
	vRParams = aa.util.newHashtable();
	vEParams.put("$$altId$$",capId.getCustomID());
	vEParams.put("$$recordAlias$$",cap.getCapType().getAlias());
	vEParams.put("$$address$$",UTILITYMODULE.getCapAddress(capId));
	vEParams.put("$$appStatus$$","Issued");
	vEParams.put("$$applicant$$", UTILITYMODULE.getContactName("Applicant"));
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

if (specBldgRecd && balanceDue<=0 &&  isTaskActive("Issuance")  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() && UTILITYMODULE.getContactEmail("Applicant") == false) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  They need their permit mailed to them.");
	}

if ((specBldgRecd || appMatch("Building/Model/NA/NA"))&& balanceDue<=0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	DEV_LYNDA_WACHT.changeDocCategory("Approved Pending Plan Set", "Approved Plan Set");
	DEV_LYNDA_WACHT.changeDocCategory("Approved Pending Revision Plan Set", "Approved Revision Plan Set");
	}

if (specBldgRecd && AInfo['subTypeASI'] != "Single Family Residence Alteration" && balanceDue <= 0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() && lookup("SECTION10", "ACTIVATED")=="Yes") {
	S10_BLDG.createS10Child(capId);
	}

if (((specBldgRecd) || appMatch("Building/Model/NA/NA")) && balanceDue <= 0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}

if ((specBldgRecd || appMatch("Building/DamageDemo/NA/NA")) && balanceDue<=0 &&  isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	setTask("Issuance", "N","Y");
	setTask("Inspection", "Y","N");
	if(appMatch("Building/Model/NA/NA"))  setTask("Close Out", "Y","N");
	}

if (appMatch("Building/Construction Noise Permit/NA/NA")  && balanceDue<=0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	setTask("Issuance", "N","Y");
	setTask("Close Out", "Y","N");
	}

if (appMatch("Building/Registered Plant/NA/NA")  && balanceDue<=0 && isTaskActive("Issuance") && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	setTask("Issuance", "N","Y");
	setTask("Summary Review", "Y","N");
	}

if (specBldgRecd && !appMatch("Building/ElecMech/NA/NA") && balanceDue<=0 && AInfo['zoningOnlyPermit']=="Yes") {
	closeTask("Inspection", "Not Required", "Closed via script","");
	}

if (specBldgRecd && !appMatch("Building/ElecMech/NA/NA") && balanceDue<=0 && AInfo['zoningOnlyPermit']=="Yes" && isTaskActive("Close Out")) {
	closeTask("Close Out", "Final", "Updated via script","");
	updateAppStatus("Final", "Updated via script");
	addStdCondition("General", "Record Finaled", capId);
	}

if ((balanceDue <= 0) && (appMatch("Building/Buildings/NA/NA") || appMatch("Building/Manufactured/NA/NA") || appMatch("Building/ElecMech/NA/NA")) && (SEWER_CONNECTION_FUNCTIONS.spawningPrereq(capId))) {
	UTILITYMODULE.spawnSewerConnectionChild(capId);
	}

if (matches(envName,"LPMPROD") && publicUser) {
	UTILITYMODULE.sendACAfeesPaidEmail(capId, PaymentTotalPaidAmount);
	} else {
	aa.debug("ACA Fees Paid Email","Not sending because environment is " + envName);
	}

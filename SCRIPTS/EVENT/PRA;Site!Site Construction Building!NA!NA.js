//PRA;Site!Site Construction Building!NA!NA
if (balanceDue==0 && isTaskActive("Issuance")&& !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	DEV_LYNDA_WACHT.changeDocCategory("Approved Pending Site Construction / Building Drawings", "Approved Site Construction / Building Drawings");
	DEV_LYNDA_WACHT.changeDocCategory("Approved Pending Revision Site Construction / Building Drawings", "Approved Revision Site Construction / Building Drawings");
	}

if (balanceDue<=0 && isTaskActive("Issuance") && AInfo['septicSewerReview']=="Sewer review required" && !appHasCondition("Associated Conditions", "Applied", "DS0110", null)) {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "DS0110");
	}

if (balanceDue<=0 && isTaskActive("Issuance") && AInfo['septicSewerReview']=="Septic review required" && !appHasCondition("Associated Conditions", "Applied", "DS0090", null)) {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "DS0090");
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

if (balanceDue==0 && isTaskActive("Issuance") && appEmail!=null && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition() && UTILITYMODULE.getContactEmail("Applicant") == false) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " "  + contArray[x]["lastName"] + " does not have an email address. The address is: "  + contArray[x]["addressLine1"] + " "  + contArray[x]["addressLine2"] + ", "  + contArray[x]["city"] + ", "  + contArray[x]["state"] + "  "  + contArray[x]["zip"] + ".  The phone number is: "  + contArray[x]["phone1"] + ".  They need their permit mailed to them.");
	}

if (balanceDue<=0 && isTaskActive("Issuance") && (SEWER_CONNECTION_FUNCTIONS.spawningPrereq(capId))) {
	UTILITYMODULE.spawnSewerConnectionChild(capId);
	}

if (balanceDue==0 && isTaskActive("Issuance")  && !DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	closeTask("Issuance", "Issued", "closed via script");
	}

if (DEV_LYNDA_WACHT.hasPriorToIssuanceCondition()) {
	showMessage=true;
	comment("Permit has not been issued due to the following condition(s) having a 'Prior to Issuance' action: " + DEV_LYNDA_WACHT.hasPriorToIssuanceCondition());
	}

if (feeBalance("DS0105") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("DS0105", "INVOICED")) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}

if (!appHasCondition(null, "Applied", null, null) && balanceDue==0 && isTaskActive("Close Out")) {
	var appEmail = UTILITYMODULE.getContactEmailByType("Applicant");
	}

if (!appHasCondition(null, "Applied", null, null) && balanceDue==0 && isTaskActive("Close Out") && matches(wfstatus, "C of O") && appEmail==null) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "Applicant")) comment ("Applicant " + contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " + contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"] + ". Their C of O needs to be mailed to them");
	}

if (!appHasCondition(null, "Applied", null, null) && balanceDue==0 && isTaskActive("Close Out") && matches(wfstatus, "C of O") && appEmail!=null) {
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
	var br = "<br>";
	var parameters = aa.util.newHashMap();
	parameters.put("ALTID", capId.getCustomID());
	UTILITYMODULE.sendEmail(capId, "Certificate of Occupancy", parameters, "AA_CERTIFICATE_OF_OCCUPANCY", notificationParameters, "Applicant",  cap.getCapType().getAlias(), "PRA", null);
	}

if (!appHasCondition(null, "Applied", null, null) && balanceDue==0 && isTaskActive("Close Out")) {
	addStdCondition("General", "Record Locked");
	closeTask("Close Out", "Complete", "Fees paid.", "Closed via script.");
	}

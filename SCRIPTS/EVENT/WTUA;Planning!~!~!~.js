//WTUA;Planning!~!~!~
if ((wfTask == "Close Out" || wfTask == "Closeout") && (wfStatus == "Complete" || wfStatus == "Withdrawn" || wfStatus == "Final" || wfStatus == "C of O" || wfStatus == "Expired")) {
	addStdCondition("General", "Record Locked", capId);
	}

if (wfTask=="Routing" && wfStatus=="In Review" && matches(appTypeArray[1],"Special Actions", "Rezoning","Comp Plan Rezoning Combo")) {
	showMessage=true;
	contArray = getContactArray();
	for (x in contArray) if(matches(contArray[x]["contactType"], "External Reviewer") && contArray[x]["email"] == null) comment ("External Reviewer: "+ contArray[x]["firstName"] + " " + contArray[x]["lastName"] + " does not have an email address. The address is: " + contArray[x]["addressLine1"] + " " + contArray[x]["addressLine2"] + ", " +contArray[x]["city"] + ", " + contArray[x]["state"] + " " + contArray[x]["zip"]+". The notification they need is 'PLANNING_SA_EXTERNALREVIEWERS_ROUTING_WFTASK'.");
	var params = new Object();
	params.AltId = capId.getCustomID();
	params.recordDescription = aa.cap.getCapWorkDesByPK(capId).getOutput().getDescription();
	varACAURL = ""+acaUrl + getACAUrl();
	params.acaWebSite= varACAURL;
	params.ACAURL = ""+acaUrl;
	var cap = aa.cap.getCap(capId).getOutput().getCapModel();
	params.Alias = cap.getCapType().getAlias();
	params.Module=cap.getModuleName();
	params.CapID1=capId.getID1();
	params.CapID2=capId.getID2();
	params.CapID3=capId.getID3();
	params.AgencyCode=aa.getServiceProviderCode();
	for (x in contArray) if(matches(contArray[x]["contactType"], "External Reviewer") && contArray[x]["email"] != null) UTILITYMODULE.sendTemplateBasedEmailAndSaveAsDocument(contArray[x]["email"], sysFromEmail, "", "PLANNING_SA_EXTERNALREVIEWERS_ROUTING_WFTASK", params, null);
	}

if (wfTask=="Close Out" && wfStatus=="Complete") {
	setTask("Legal Ad","N","Y","DS_NOTIFICATION");
	setTask("Notice Mailed","N","Y","DS_NOTIFICATION");
	setTask("Posted Sign","N","Y","DS_NOTIFICATION");
	setTask("Notification","N","Y");
	}

if (wfTask=="Application Intake" && wfStatus=="Accepted") {
	var parAlt= getParent();
	if(parAlt) DEV_LYNDA_WACHT.processConditions(parAlt.getCustomID(), capId);
	}

if (wfTask == "RFCD"  && !matches(wfStatus, "Note", "Additional Information", "Additional Comments")) {
	assignTask(wfTask,"AA_RFCD_PLANNING_REVIEW");
	}

if ((appMatch("Planning/Comp Plan Amendment/NA/NA") || appMatch("Planning/Comp Plan Rezoning Combo/NA/NA") || appMatch("Planning/Conditional Use/NA/NA") || appMatch("Planning/Rezoning/NA/NA")) && (wfTask == "BOS Hearing" && matches(wfStatus, "Approved", "Denied"))) {
	UTILITYMODULE.sendSurveyEmail(capId);
	}


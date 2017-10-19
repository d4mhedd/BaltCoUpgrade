//DLH 171012 conversion begin

parentCapId = getParentCapId(capId);
copyKeyInfo(capId, parentCapId);
var ren = new licenseObject(null,parentCapId);
ren.setStatus("Active");
updateTask("License Issuance","Renewal Pending","updated via Script","","",parentCapId);
if (currentUserGroup == "LicensePublicUser") {
	emailContact("Baltimore County Pet Renewal Application","Thank you for submitting your Pet Renewal Application. Your Renewal Transaction Number is " + capIDString + ". This application will be applied to your original License "+ aa.cap.getCap(parentCapId).getOutput().getCapID().getCustomID() + ", once the application is processed and approved, your original License will be updated and re-issued. This is a system generated email. DO NOT REPLY.","Pet Owner");
	}

projectScriptModels = aa.cap.getProjectByChildCapID(capId, "Renewal","Incomplete").getOutput();
disableTokens = true;
if (projectScriptModels) {
	for (psm in projectScriptModels) AInfo["aa.print("closing renewal");
	projectScriptModels[psm].setStatus("Complete");
	aa.cap.updateProject(projectScriptModels[psm]);
	"];
	}

disableTokens = false;
	
//DLH 171012 conversion end
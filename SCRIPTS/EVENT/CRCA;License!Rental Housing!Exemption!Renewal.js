//DLH 171012 conversion begin

parentCapId = getParentCapId(capId);
copyKeyInfo(capId, parentCapId);
var ren = new licenseObject(null,parentCapId);
ren.setStatus("Pending");
updateTask("Application Acceptance","Renewal Pending","updated via Script","","",parentCapId);
if (capIDString != "TMP") {
	emailContact("Baltimore County Rental Housing Registration","Thank you for renewing your rental registration exemption. Your tracking number is "+capIDString+". This application will be applied to your original License "+ aa.cap.getCap(parentCapId).getOutput().getCapID().getCustomID() + ", once the application is processed and approved, your original Rental Housing Exemption License will be updated and re-issued. The Rental Registration office will review your application and you will be notified when it has been approved.<br/><br/>For questions, contact us at pairentalregistration@baltimorecountymd.gov or 410-887-6060.<br/><br/>This is a system generated email. Do not reply.");
	}

updateTask("Status","Original Data Updated","updated via Script","","");
projectScriptModels = aa.cap.getProjectByChildCapID(capId, "Renewal","Incomplete").getOutput();
disableTokens = true;
if (projectScriptModels) {
	for (psm in projectScriptModels) AInfo["   aa.print("closing renewal");
	projectScriptModels[psm].setStatus("Complete");
	aa.cap.updateProject(projectScriptModels[psm]);
	"];
	}

disableTokens = false;
aa.cap.updateAccessByACA(capId, "Y");
aa.cap.createRenewalCap(parentCapId, capId, true);
	
//DLH 171012 conversion end
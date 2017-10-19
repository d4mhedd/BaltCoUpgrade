//DLH 171012 conversion begin

parentCapId = getParentCapId(capId);
copyKeyInfo(capId, parentCapId);
var ren = new licenseObject(null,parentCapId);
ren.setStatus("Pending");
updateTask("Application Acceptance","Renewal Pending","updated via Script","","",parentCapId);
if (capIDString != "TMP") {
	emailContact("Baltimore County Rental Housing Registration","Thank you for renewing your rental housing license. Your tracking number is "+capIDString+". This application will be applied to your original License "+ aa.cap.getCap(parentCapId).getOutput().getCapID().getCustomID() + ", once the application is processed and approved, your original Rental Housing License will be updated and re-issued. The Rental Registration office will review your application and you will be notified when it has been approved.<br/><br/>For questions, contact us at pairentalregistration@baltimorecountymd.gov or 410-887-6060.<br/><br/>This is a system generated email. Do not reply.");
	}

updateTask("Status","Original Data Updated","updated via Script","","",capId);
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
if (currentUserGroup != "LicensePublicUser") {
	var notOwner="Yes";
	var Owner2="UNCHECKED";
	var Owner3="UNCHECKED";
	var OwnerMD ="Yes";
	var notOwner =  AInfo["Is the Property Owner Occupied?"];
	var Owner2 = AInfo["Owner Occupied 1 or 2 Tenants"];
	var Owner3 = AInfo["Owner Occupied More Than 2"];
	var OwnerMD= AInfo["Does the Property Owner Live in Maryland?"];
	}

if (currentUserGroup != "LicensePublicUser" && feeExists("LR100","NEW")) {
	removeFee("LR100","FINAL");
	}

if (currentUserGroup != "LicensePublicUser" && feeExists("LR200","NEW")) {
	removeFee("LR200","FINAL");
	}

if (currentUserGroup != "LicensePublicUser" && feeExists("LR300","NEW")) {
	removeFee("LR300","FINAL");
	}

if (currentUserGroup != "LicensePublicUser" && notOwner =="No") {
	addFee("LR300","LICRENT", "FINAL", 1, "Y");
	}

if (currentUserGroup != "LicensePublicUser" && Owner2  == "CHECKED") {
	addFee("LR100","LICRENT", "FINAL", 1, "Y");
	}

if (currentUserGroup != "LicensePublicUser" && Owner3 == "CHECKED") {
	addFee("LR200","LICRENT", "FINAL", 1, "Y");
	}

if (currentUserGroup != "LicensePublicUser" && OwnerMD == "No") {
	addFee("LR300","LICRENT", "FINAL", 1, "Y");
	}
	
//DLH 171012 conversion end
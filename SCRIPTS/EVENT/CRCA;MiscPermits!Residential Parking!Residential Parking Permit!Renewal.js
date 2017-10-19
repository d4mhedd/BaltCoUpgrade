//DLH 171012 conversion begin

parentCapId = getParentCapId(capId);
copyKeyInfo(capId, parentCapId);
var ren = new licenseObject(null,parentCapId);
ren.setStatus("Active");
updateTask("Application Review","Renewal Pending","updated via Script","","",parentCapId);
projectScriptModels = aa.cap.getProjectByChildCapID(capId, "Renewal","Incomplete").getOutput();
disableTokens = true;
if (projectScriptModels) {
	for (psm in projectScriptModels) AInfo["   aa.print("closing renewal");
	projectScriptModels[psm].setStatus("Complete");
	aa.cap.updateProject(projectScriptModels[psm]);
	"];
	}
	
disableTokens = false;
	
//DLH 171012 conversion end
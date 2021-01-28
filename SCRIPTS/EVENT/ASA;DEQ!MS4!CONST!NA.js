//ASA;DEQ!MS4!CONST!NA
var subType = "PCS";
if (AInfo['subType'] == "Construction Site") subType = "CS";
var projName = "";
if (AInfo['projectName'] != null) projName = AInfo['projectName'];
if (capName!=null) {
	editAppName(subType + "-" + projName + "-" + capName);
	}

if (capName==null) {
	editAppName(subType + "-" + projName);
	}

updateAppStatus("New","auto");
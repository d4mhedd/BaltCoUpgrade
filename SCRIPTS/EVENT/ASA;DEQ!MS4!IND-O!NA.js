//ASA;DEQ!MS4!IND-O!NA
var subType = "IF";
if (AInfo['subType'] == "County Facility") subType = "CF";
if (AInfo['subType'] == "Outfall") subType = "O";
var idNum = AInfo['deqID'] || AInfo['azpdesNumber'] || AInfo['fidNum'];
var facName = "";
if (AInfo['facilityName'] != null) facName = "- " + AInfo['facilityName'];
if (capName != null) {
	editAppName(subType + idNum + facName + "-" + capName);
	}

if (capName==null) {
	editAppName(subType + idNum + facName);
	}

updateAppStatus("Active - Uninspected","auto");
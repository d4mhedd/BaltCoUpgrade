//ASIUA;Building!Right of Way!NA!NA
if (!ROWMODULE.haveValidNumberOfServiceMeters(capId)) {
	showMessage=true;
	comment("<font color='red'>Warning: Maximum of six service meters allowed in UTILITY TYPE ASIT. Please correct to avoid improper fee calculation.</font>");
	}

ROWMODULE.updateUtilityTypeTableAndDerivedFields(capId);
var output = ROWMODULE.getNumOutsideAgencyHours(capId);
editAppSpecific("improvementOutsideAgency",output.review);
if (AInfo['deptPlanReview'] == "DSD") {
	var taskArray = ["Application Intake", "Admin Review", "Routing", "Review Consolidation", "Issuance"];
	ROWMODULE.assignMultiTasks(taskArray, "AA_DSD_SITE", capId);
	}

if (AInfo['deptPlanReview'] == "DOT") {
	var taskArray = ["Application Intake", "Admin Review", "Routing", "Review Consolidation", "Issuance"];
	ROWMODULE.assignMultiTasks(taskArray, "AA_DOT_ROW", capId);
	}

list = aa.address.getAddressByCapId(capId).getOutput();
var realStreetName;
if (list.length > 0) {
	realStreetName = list[0].getStreetName();
	editAppSpecific("streetName", realStreetName);
	}

if (list.length <= 0 && AInfo['streetName'] != null) {
	realStreetName = AInfo['streetName'];
	}

if (realStreetName != null && AInfo['crossStreets'] != null) {
	editAppName(realStreetName +  " - " + AInfo['crossStreets']);
	}

if (realStreetName != null && AInfo['crossStreets'] == null) {
	editAppName(realStreetName);
	}

if (realStreetName == null && AInfo['crossStreets'] != null) {
	editAppName(AInfo['crossStreets']);
	}


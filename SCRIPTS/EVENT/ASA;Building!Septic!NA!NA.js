//ASA;Building!Septic!NA!NA
closeTask("Application Intake","Submitted","Auto-Submit","","SS_SEPTICWORKFLOWV2");
SEPTICMODULE.assessFees(capId);
SEPTICMODULE.handleGIS(capId);
if (AInfo['septicType'] == "Alternative") {
	CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "DS0930", capId);
	}

if (capName == null || capName == "") {
	editAppName(AInfo['septicType'] + " Septic");
	} else {
	editAppName(AInfo['septicType'] + " Septic - " + capName);
	}

var recordDescription = aa.cap.getCapWorkDesByPK(capId).getOutput();
var currentDescription = recordDescription.getDescription();
if (currentDescription == null || currentDescription == "") {
	recordDescription.setDescription(AInfo['septicType'] + " Septic");
	} else {
	recordDescription.setDescription(AInfo['septicType'] + " Septic - " + currentDescription);
	}

aa.cap.editCapWorkDes(recordDescription.getCapWorkDesModel());
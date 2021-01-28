//ASA;Site!Addressing!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
closeTask("Application Intake","Submitted","Auto-Submit","","AD_ADDRESSING2_PROCESS");
updateAppStatus("Submitted","auto-submit");
if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_AddressingFees();
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['requestType'] == "Street Naming" || AInfo['requestType'] == "Street Naming and New Address")) {
	addFee("DS0146","ADDRESSING","FINAL", 1 ,"N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['projectType'] == "Single Lot") && (AInfo['requestType'] == "New Address" || AInfo['requestType'] == "Change of Address" || AInfo['requestType'] == "Street Naming and New Address")) {
	addFee("DS0145","ADDRESSING","FINAL", parseInt(AInfo['numAddresses']) + parseInt(AInfo['numUnits']) ,"N");
	}

if (AInfo['projectType'] == "Plat" || AInfo['projectType'] == "Commercial Development") {
	addFee("DS0150","ADDRESSING","FINAL", AInfo['numSheets'] ,"N");
	addFee("DS0149","ADDRESSING","FINAL", 1 ,"N");
	}

if (matches(AInfo['projectType'], "Single Lot", "Street Naming")) {
	updateAppStatus("In Review");
	}

if (matches(AInfo['projectType'], "Plat", "Commercial Development")) {
	updateAppStatus("Pending");
	}

if (AInfo['projectType'] == "Single Lot") {
	editAppName(AInfo['requestType']);
	}

if (AInfo['projectType'] == "Street Naming") {
	editAppName("Street Naming");
	}

if (matches(AInfo['projectType'], "Commercial Development", "Plat")) {
	editAppName("Addresssing review");
	}

var recordDescription = aa.cap.getCapWorkDesByPK(capId).getOutput();
var currentDescription = recordDescription.getDescription();
if (currentDescription == null || currentDescription == "") {
	recordDescription.setDescription(AInfo['location']);
	} else {
	recordDescription.setDescription(AInfo['location'] + " - " + currentDescription);
	}

aa.cap.editCapWorkDes(recordDescription.getCapWorkDesModel());
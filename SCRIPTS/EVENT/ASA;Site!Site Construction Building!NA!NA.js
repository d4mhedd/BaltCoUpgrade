//ASA;Site!Site Construction Building!NA!NA
if (capName !=null || capName=="") {
	editAppName(AInfo['subTypeASI'] + " - " + capName);
	} else {
	editAppName(AInfo['subTypeASI']);
	}

closeTask("Application Intake","Submitted","Auto-Submit","Closed via script");
editTaskDueDate("Admin Review",dateAdd(null,1,"Y"));
editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
editAppSpecific("totalRiparianOnProperty",APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(capId));
RIPARIAN_FUNCTIONS.recalculateProtectedFieldsSC(capId);
var asit = loadASITable("PROXIMITY ALERT (APO)", capId);
var starValleyActive = asit[0]["Star Valley TRA"];
if (starValleyActive == "Y" && matches(AInfo['subTypeASI'], "Commercial Building New", "Multi-Family Residence New Building", "Single Family Residence New")) {
	addStdCondition("Proximity Alert", "Star Valley TRA");
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_SiteConstructionBuildingFees();
	}
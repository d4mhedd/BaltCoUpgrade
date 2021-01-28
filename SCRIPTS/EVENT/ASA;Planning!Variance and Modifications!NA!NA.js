//ASA;Planning!Variance and Modifications!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
updateAppStatus("Submitted","Auto-Set");
editAppName(AInfo['typeRequested'] + " " + (capName != null ? capName : ""));
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['typeRequested'] == "Design Review Committee" && AInfo['drcType'] == "Campus Park Industrial Project")) {
	addFee("DS0049", "VARIANCE AND MODIFICATIONS", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['typeRequested'] == "Design Review Committee" && AInfo['drcType'] == "Landscape Plan Appeal")) {
	addFee("DS0050", "VARIANCE AND MODIFICATIONS", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['typeRequested'] == "Design Review Committee" && AInfo['drcType'] == "Historic District Plan Review")) {
	addFee("DS0051", "VARIANCE AND MODIFICATIONS", "FINAL", 1, "N");
	}

if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_VarianceAndModificationFees();
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['typeRequested'] == "Appeal of Interpretation")) {
	addFee("DS0058", "VARIANCE AND MODIFICATIONS", "FINAL", 1, "N");
	}

if (typeof VARIANCEORMODIFICATIONREQ != "undefined" && AInfo['typeRequested'] == "Modification of Subdivision Street Standards") {
	for (var cnt=0;
	cnt< VARIANCEORMODIFICATIONREQ.length;
	cnt++) addFee("DS0089","VARIANCE AND MODIFICATIONS","FINAL",1,"N");
	}

editAppSpecific("submittalCounter",0);
// intialize the submittal counter. Setting the defauls in ASI config seems to have no effect;
var zoneOne = "";
zoneOne = APO_FUNCTIONS.getZoningAttribByPrimaryParcel(capId, "Zone 1");
if ((typeof(zoneOne) != "undefined")) {
	editAppSpecific("existingZoning",zoneOne);
	}

editAppSpecific("supervisorDistrict",AInfo['ParcelAttribute.SupervisorDistrict']);
if (AInfo['typeRequested'] == "RWRD Standards Variance") {
	assignTask("Application Intake", "AA_RWRD_ENGINEERING_SVCS");
	assignTask("Routing", "AA_RWRD_ENGINEERING_SVCS");
	assignTask("Notification", "AA_RWRD_ENGINEERING_SVCS");
	assignTask("Review Consolidation", "AA_RWRD_ENGINEERING_SVCS");
	assignTask("Staff Report", "AA_RWRD_ENGINEERING_SVCS");
	assignTask("Hearing", "AA_RWRD_ENGINEERING_SVCS");
	assignTask("Director", "AA_RWRD_ENGINEERING_SVCS");
	assignTask("Close Out", "AA_RWRD_ENGINEERING_SVCS");
	} else {
	assignTask("Application Intake", "AA_DSD_PLANNING");
	assignTask("Routing", "AA_DSD_PLANNING");
	assignTask("Notification", "AA_DSD_PLANNING");
	assignTask("Review Consolidation", "AA_DSD_PLANNING");
	assignTask("Staff Report", "AA_DSD_PLANNING");
	assignTask("Hearing", "AA_DSD_PLANNING");
	assignTask("Director", "AA_DSD_PLANNING");
	assignTask("Close Out", "AA_DSD_PLANNING");
	}

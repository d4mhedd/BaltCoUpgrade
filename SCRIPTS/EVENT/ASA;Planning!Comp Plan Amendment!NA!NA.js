//ASA;Planning!Comp Plan Amendment!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (AInfo['totalAcres'] > 0)) {
	addFee("DS0005", "COMP PLAN AMENDMENT", "FINAL", AInfo['totalAcres'], "N");
	}

FEE_UTILS_MODULE.ASA_CompPlanAmendmentFees();
updateTask("Application Intake","Submitted","Auto-Submit","Updated via Script");
editAppSpecific("boardOfSupervisorDistrict",AInfo['ParcelAttribute.SupervisorDistrict']);
zoningAPO = loadASITable("ZONING (APO)");
comment("length: " + zoningAPO.length);
if (typeof(zoningAPO) == "object") {
	var zoneInfo = "";
	for(x in zoningAPO) zoneInfo = zoningAPO[x]["Zone 1"] + "," + zoningAPO[x]["Zone 2"]+ "," + zoningAPO[x]["Zone 3"] + "," + zoningAPO[x]["Zone 4"];
	zoneInfo = zoneInfo.replace(/,,/g,",");
	zoneInfo = zoneInfo.replace(/,,/g,",");
	var zoneLen = zoneInfo.length;
	if(zoneInfo.charAt( zoneLen- 1)==",") zoneInfo=zoneInfo.substr(0, (zoneLen - 1));
	editAppSpecific("zoningDesignations", zoneInfo);
	comment("zoneInfo: " + zoneInfo);
	}
//ASA;Planning!Zoning Use!NA!NA
DEV_LYNDA_WACHT.getFeeSchedVersion();
closeTask("Application Intake","Submitted","Auto-Submit","Closed Via Script");
varDevProjNum = false;
if (FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion'])) {
	FEE_UTILS_MODULE.ASA_ZoningUsePermitFees();
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (matches(AInfo['subType'], 'Modification of Setback Requirements'))) {
	addFee("DS0056", "ZONING USE PERMIT", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (matches(AInfo['subType'], 'Secondary Dwelling'))) {
	addFee("DS0118", "ZONING USE PERMIT", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (matches(AInfo['subType'], 'MU Special Use'))) {
	addFee("DS0133", "ZONING USE PERMIT", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (matches(AInfo['subType'], 'Assisted Living', 'Adult/Child Care 6 or Less', 'Group Home', 'Home Occupation'))) {
	addFee("DS0134", "ZONING USE PERMIT", "FINAL", 1, "N");
	}

if (!FEE_UTILS_MODULE.isAfterFY2021(AInfo['feeScheduleVersion']) && (matches(AInfo['subType'], 'Adult/Child Care 7 - 10'))) {
	addFee("DS0135", "ZONING USE PERMIT", "FINAL", 1, "N");
	}

var myArrDevProjNum = getGISInfoArray("PIMA","Development Permits","PROJ_NUM1");
if (myArrDevProjNum.length > 0) {
	varDevProjNum = myArrDevProjNum[0];
	} else {
	varDevProjNum = null;
	}

if (myArrDevProjNum.length > 1 && !((varDevProjNum).indexOf(myArrDevProjNum[1]) > -1)) {
	varDevProjNum = varDevProjNum + ";
	" + myArrDevProjNum[1];
	}

if (myArrDevProjNum.length > 2 && !((varDevProjNum).indexOf(myArrDevProjNum[2]) > -1)) {
	varDevProjNum = varDevProjNum + ";
	" + myArrDevProjNum[2];
	}

if (myArrDevProjNum.length > 3 && !((varDevProjNum).indexOf(myArrDevProjNum[3]) > -1)) {
	varDevProjNum = varDevProjNum + ";
	" + myArrDevProjNum[3];
	}

if (varDevProjNum) {
	editAppSpecific("developmentProjectNumber",varDevProjNum);
	}

zoningAPO = loadASITable("ZONING (APO)");
if (typeof(zoningAPO) == "object") {
	var zoneInfo = "";
	for(x in zoningAPO) zoneInfo = zoningAPO[x]["Zone 1"] + "," + zoningAPO[x]["Zone 2"]+ "," + zoningAPO[x]["Zone 3"] + "," + zoningAPO[x]["Zone 4"];
	zoneInfo = zoneInfo.replace(/,,/g,",");
	zoneInfo = zoneInfo.replace(/,,/g,",");
	var zoneLen = zoneInfo.length;
	if(zoneInfo.charAt( zoneLen- 1)==",") zoneInfo=zoneInfo.substr(0, (zoneLen - 1));
	editAppSpecific("zoning", zoneInfo);
	}

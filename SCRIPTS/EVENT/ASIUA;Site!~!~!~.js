//ASIUA;Site!~!~!~
var asitSBBexists= false;
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length>0) asitSBBexists=true;
if (asitSBBexists) {
	var ttlSqFt = 0;
	for (x in SITEBUILTBUILDINGS) ttlSqFt+= parseFloat(SITEBUILTBUILDINGS[x]["Sq. Ft."]);
	if(AInfo['totalSqFt']!=ttlSqFt) editAppSpecific("totalSqFt", ttlSqFt);
	editAppSpecific("buildingSquareFootage",ttlSqFt);
	var ttlBldgFee=0;
	for (x in SITEBUILTBUILDINGS) ttlBldgFee+= Number(SITEBUILTBUILDINGS[x]["Building Fee"]);
	ttlBldgFee= Number(ttlBldgFee).toFixed(2);
	if(ttlSqFt>1000);
	if(AInfo['siteOffModelPermit']=="Yes") ttlBldgFee=ttlBldgFee*.8;
	if(AInfo['totalBuildingFee']!=ttlBldgFee);
	ttlBldgFee=Number(ttlBldgFee).toFixed(2);
	editAppSpecific("totalBuildingFee",ttlBldgFee);
	var ttlRelVal=0;
	for (x in SITEBUILTBUILDINGS) ttlRelVal+= Number(SITEBUILTBUILDINGS[x]["Relative Valuation"]);
	ttlRelVal = Number(ttlRelVal).toFixed(2);
	if(AInfo['totalRelativeValuation']!=ttlRelVal) editAppSpecific("totalRelativeValuation", ttlRelVal);
	}

if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length==0) editAppSpecific("totalRelativeValuation", 0);
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length==0) editAppSpecific("totalBuildingFee",0);
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length==0) editAppSpecific("totalSqFt", 0);
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length==0) editAppSpecific("buildingSquareFootage",0);
if (appMatch("Site/Site Construction Building/NA/NA")) {
	SEWER_CONNECTION_FUNCTIONS.assessFees(capId, "METERS");
	}

if ((appTypeString == "Site/Site Construction Building/NA/NA" || appTypeString == "Site/Sewer Connection Permit/NA/NA")) {
	BLUE_BONNET_FUNCTIONS.ASAWTUASite(capId);
	}
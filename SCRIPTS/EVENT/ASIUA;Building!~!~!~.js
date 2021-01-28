//ASIUA;Building!~!~!~
var asitSBBexists= false;
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length>0) asitSBBexists=true;
if (asitSBBexists) {
	var ttlSqFt = 0;
	for (x in SITEBUILTBUILDINGS) ttlSqFt+= parseFloat(SITEBUILTBUILDINGS[x]["Sq. Ft."]);
	editAppSpecific("totalSqFt", ttlSqFt);
	var ttlBldgFee=0;
	for (x in SITEBUILTBUILDINGS) ttlBldgFee+= parseFloat(SITEBUILTBUILDINGS[x]["Building Fee"]);
	if(AInfo['totalBuildingFee']!=ttlBldgFee);
	editAppSpecific("totalBuildingFee",ttlBldgFee.toFixed(2));
	var ttlRelVal=0;
	for (x in SITEBUILTBUILDINGS) ttlRelVal+= parseFloat(SITEBUILTBUILDINGS[x]["Relative Valuation"]);
	editAppSpecific("totalRelativeValuation", ttlRelVal.toFixed(0));
	}

var asitRiparExists= false;
if (typeof(RIPARIANAPO )=="object") if(RIPARIANAPO .length>0) asitRiparExists=true;
if (specBldgRecd && asitRiparExists) {
	var ttlRipar = 0;
	for (x in RIPARIANAPO ) ttlRipar+= parseFloat(RIPARIANAPO [x]["Total Acres"]);
	editAppSpecific("totalRiparianOnProperty", ttlRipar);
	}

if (specBldgRecd && asitRiparExists && AInfo['riparianDisturbed']>0) {
	var riparAvoid =  parseFloat(ttlRipar) - parseFloat(AInfo['riparianDisturbed']);
	editAppSpecific("avoidedDisturbanceOfRiparianHabitat", riparAvoid.toFixed(2));
	}

if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length==0) editAppSpecific("totalRelativeValuation", 0);
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length==0) editAppSpecific("totalBuildingFee",0);
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length==0) editAppSpecific("totalSqFt", 0);
if (appMatch("Building/Buildings/NA/NA") || appMatch("Building/Manufactured/NA/NA")  || appMatch("Building/ElecMech/NA/NA")) {
	SEWER_CONNECTION_FUNCTIONS.assessFees(capId, "METERS");
	}

if ((appTypeString == "Building/Buildings/NA/NA" || appTypeString == "Building/Manufactured/NA/NA" || appTypeString == "Building/ElecMech/NA/NA")) {
	BLUE_BONNET_FUNCTIONS.ASAWTUABuilding(capId);
	}

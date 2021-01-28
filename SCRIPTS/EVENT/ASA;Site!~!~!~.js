//ASA;Site!~!~!~
if (matches(appTypeArray[1], "Site Construction Building","Site Construction")) {
	DEV_LYNDA_WACHT.getFeeSchedVersion();
	}

var asitSBBexists= false;
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length>0) asitSBBexists=true;
if (asitSBBexists) {
	DEV_LYNDA_WACHT.updateSBBasit(AInfo['feeScheduleVersion']);
	var ttlSqFt = 0;
	for (x in SITEBUILTBUILDINGS) ttlSqFt+= parseFloat(SITEBUILTBUILDINGS[x]["Sq. Ft."]);
	editAppSpecific("totalSqFt", ttlSqFt);
	editAppSpecific("buildingSquareFootage",ttlSqFt);
	}

var recPrclNbrArr = APO_FUNCTIONS.getRecordParcelNumberArr(capId);
var parAltArray=false;
var layersToSearch=false;
if (recPrclNbrArr && recPrclNbrArr.length>0 && !exists("999999999", recPrclNbrArr) && AInfo['subTypeASI'] != null) {
	recdInfo= appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3] +"|"+AInfo['subTypeASI'];
	layersToSearch = lookup("Building_Conditions_Linking", recdInfo);
	}

if (recPrclNbrArr && recPrclNbrArr.length>0 && !exists("999999999", recPrclNbrArr) && AInfo['subTypeASI'] == null) {
	recdInfo= appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3];
	layersToSearch = lookup("Building_Conditions_Linking", recdInfo);
	}

if (layersToSearch && layersToSearch.length > 0) {
	parAltArray=DEV_LYNDA_WACHT.getParentFromParcel("PIMA",layersToSearch);
	if(!parAltArray["altId"]) parAltArray = false;
	}

if (parAltArray) {
	var parCap = aa.cap.getCapID(parAltArray["altId"] ).getOutput();
	if(!parCap) comment("<B><Font Color=PURPLE>NOTE: The record ID that was returned (" + parAltArray["altId"] + ") is not valid and needs to be corrected in GIS. </B></Font>");
	if(!parCap) parAltArray=false;
	if(!parCap) showMessage=true;
	}

if (parAltArray) {
	addParent(""+parAltArray["altId"]);
	if(parAltArray["multiple"]) showMessage=true;
	if(parAltArray["multiple"]) comment("Multiple records were returned from GIS for this record.  Please verify the correct record has been added as a parent to this record (" + parAltArray["altId"] + ") before marking this record as Administratively Complete");
	}

if (appMatch("Site/Development Concept Permit/NA/NA") || appMatch("Site/Tentative Plat/NA/NA") || appMatch("Site/Final Plat/NA/NA") || appMatch("Site/Site Construction/NA/NA") || appMatch("Site/Site Construction Building/NA/NA")) {
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher","");
	assignTask("Ad Hoc Task Launcher","BackgroundGU");
	}

if (!publicUser) {
	APO_FUNCTIONS.loadExtraParcelData(capId);
	}

copyParcelGisObjects();
if ((appTypeString == "Site/Site Construction Building/NA/NA" || appTypeString == "Site/Sewer Connection Permit/NA/NA")) {
	BLUE_BONNET_FUNCTIONS.ASAWTUASite(capId);
	}

if (appMatch("Site/Site Construction Building/NA/NA")) {
	SEWER_CONNECTION_FUNCTIONS.assessFees(capId, "METERS");
	}

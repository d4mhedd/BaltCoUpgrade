//ASA;Building!~!~!~
if (!publicUser && matches(appTypeArray[1], "Buildings","ElecMech","Other Structures") && AInfo['siteOffModelPermit']=="Yes") {
	var tgtWallFence = false;
	if(AInfo['wallFenceLinearFt']!="" && AInfo['wallFenceLinearFt']!=null) tgtWallFence=AInfo['wallFenceLinearFt'];
	sourceCapId=aa.cap.getCapID(AInfo['pimaModel']+"T").getOutput();
	var sourceASI = aa.appSpecificInfo.getByCapID(sourceCapId).getOutput();
	for (ASICount in sourceASI) editAppSpecific(sourceASI[ASICount].getCheckboxDesc(), sourceASI[ASICount].getChecklistComment());
	copyASITables(sourceCapId, capId);
	editAppSpecific("subTypeASI", getAppSpecific("subType",sourceCapId));
	if(tgtWallFence) editAppSpecific("wallFenceLinearFt", tgtWallFence);
	//UTILITYMODULE.removeValuationFeeDataFromASIT();
	}

if (!publicUser && capName !=null && specBldgRecd) {
	editAppName(AInfo['subTypeASI'] + " - " + capName);
	}

if (!publicUser && capName ==null && specBldgRecd) {
	editAppName(AInfo['subTypeASI']);
	}

if (specBldgRecd) {
	closeTask("Application Intake","Submitted","Application successfully submitted","Closed via script");
	editTaskDueDate("Admin Review",dateAdd(null,1,"Y"));
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	}

if (!publicUser && (specBldgRecd || matches(appTypeArray[1], "Model"))) {
	DEV_LYNDA_WACHT.getFeeSchedVersion();
	}

var asitSBBexists= false;
var vASIT = loadASITable("SITE BUILT BUILDINGS");
if (typeof(vASIT)=="object") if(vASIT.length>0) asitSBBexists=true;
if (asitSBBexists) {
	DEV_LYNDA_WACHT.updateSBBasit(AInfo['feeScheduleVersion']);
	vASIT = loadASITable("SITE BUILT BUILDINGS");
	var ttlSqFt = 0;
	for (x in vASIT) ttlSqFt+= parseFloat(vASIT[x]["Sq. Ft."]);
	if(AInfo['totalSqFt']!=ttlSqFt) editAppSpecific("totalSqFt", ttlSqFt);
	var ttlBldgFee=0;
	for (x in vASIT) ttlBldgFee+= parseFloat(vASIT[x]["Building Fee"]);
	if(ttlSqFt>1000);
	if(AInfo['totalBuildingFee']!=ttlBldgFee);
	editAppSpecific("totalBuildingFee",ttlBldgFee.toFixed(2));
	var ttlRelVal=0;
	for (x in vASIT) ttlRelVal+= parseFloat(vASIT[x]["Relative Valuation"]);
	if(AInfo['totalRelativeValuation']!=ttlRelVal) editAppSpecific("totalRelativeValuation", ttlRelVal.toFixed(0));
	}

var recPrclNbrArr = APO_FUNCTIONS.getRecordParcelNumberArr(capId);
var parAltArray=false;
var layersToSearch=false;
if (recPrclNbrArr && recPrclNbrArr.length>0 && !exists("999999999", recPrclNbrArr)) {
	recdInfo= appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3] +"|"+AInfo['subTypeASI'];
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

if (!publicUser && (specBldgRecd || appMatch("Building/Model/NA/NA"))) {
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher","");
	assignTask("Ad Hoc Task Launcher","BackgroundGU");
	}

if (!publicUser) {
	APO_FUNCTIONS.loadExtraParcelData(capId);
	}

if (specBldgRecd && !(AInfo['riparianDisturbed']>0)) {
	editAppSpecific("avoidedDisturbanceOfRiparianHabitat", APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
	}

if (specBldgRecd && AInfo['riparianDisturbed']>0) {
	comment(APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
	var riparAvoid = parseFloat(APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres")) - parseFloat(AInfo['riparianDisturbed']);
	editAppSpecific("avoidedDisturbanceOfRiparianHabitat", riparAvoid.toFixed(2));
	}

if (specBldgRecd && AInfo['siteOffModelPermit']=="Yes") {
	DEV_LYNDA_WACHT.addAllConditionsToRecord(getApplication(AInfo['pimaModel']+"T"), capId);
	DEV_LYNDA_WACHT.copyPendingInspAsPending(getApplication(AInfo['pimaModel']+"T"), capId);
	}

copyParcelGisObjects();
if (matches(appTypeArray[1],"Buildings","ElecMech","Manufactured","Other Structures","Site Work","DamageDemo")) {
	editAppSpecific("totalRiparianOnProperty",APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
	editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(capId));
	RIPARIAN_FUNCTIONS.recalculateProtectedFieldsSC(capId);
	}

if (appMatch("Building/Buildings/NA/NA") || appMatch("Building/Manufactured/NA/NA") || appMatch("Building/ElecMech/NA/NA")) {
	SEWER_CONNECTION_FUNCTIONS.assessFees(capId, "METERS");
	}

if ((appTypeString == "Building/Buildings/NA/NA" || appTypeString == "Building/Manufactured/NA/NA" || appTypeString == "Building/ElecMech/NA/NA")) {
	BLUE_BONNET_FUNCTIONS.ASAWTUABuilding(capId);
	}
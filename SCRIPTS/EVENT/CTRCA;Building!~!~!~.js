//CTRCA;Building!~!~!~
if (matches(appTypeArray[1], "Buildings","ElecMech","Other Structures") && AInfo['siteOffModelPermit']=="Yes") {
	addParent(AInfo['pimaModel']+"T");
	sourceCapId=aa.cap.getCapID(AInfo['pimaModel']+"T").getOutput();
	var sourceASI = aa.appSpecificInfo.getByCapID(sourceCapId).getOutput();
	for (ASICount in sourceASI) editAppSpecific(sourceASI[ASICount].getCheckboxDesc(), sourceASI[ASICount].getChecklistComment());
	copyASITables(sourceCapId, capId), editAppSpecific("subTypeASI",getAppSpecific("subType",sourceCapId));
	}

if (specBldgRecd  && capName !=null) {
	editAppName(AInfo['subTypeASI'] + " - " + capName);
	}

if (specBldgRecd && capName ==null) {
	editAppName(AInfo['subTypeASI']);
	}

if (specBldgRecd) {
	closeTask("Application Intake","Submitted","Application successfully submitted","");
	activateTask("Admin Review");
	editTaskDueDate("Admin Review",dateAdd(null,1,"Y"));
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	}

if (specBldgRecd || matches(appTypeArray[1], "Model")) {
	DEV_LYNDA_WACHT.getFeeSchedVersion();
	}

var asitSBBexists= false;
if (typeof(SITEBUILTBUILDINGS)=="object") if(SITEBUILTBUILDINGS.length>0) asitSBBexists=true;
if (asitSBBexists) {
	DEV_LYNDA_WACHT.updateSBBasit(AInfo['feeScheduleVersion']);
	var ttlSqFt = 0;
	for (x in SITEBUILTBUILDINGS) ttlSqFt+= parseFloat(SITEBUILTBUILDINGS[x]["Sq. Ft."]);
	if(AInfo['totalSqFt']!=ttlSqFt) editAppSpecific("totalSqFt", ttlSqFt);
	var ttlBldgFee=0;
	for (x in SITEBUILTBUILDINGS) ttlBldgFee+= parseFloat(SITEBUILTBUILDINGS[x]["Building Fee"]);
	if(ttlSqFt>1000);
	if(AInfo['siteOffModelPermit']=="Yes") ttlBldgFee=ttlBldgFee*.8;
	if(AInfo['totalBuildingFee']!=ttlBldgFee);
	ttlBldgFee=ttlBldgFee.toFixed(0);
	editAppSpecific("totalBuildingFee",ttlBldgFee);
	var ttlRelVal=0;
	for (x in SITEBUILTBUILDINGS) ttlRelVal+= parseFloat(SITEBUILTBUILDINGS[x]["Relative Valuation"]);
	if(AInfo['totalRelativeValuation']!=ttlRelVal) editAppSpecific("totalRelativeValuation", ttlRelVal);
	}

if (specBldgRecd) {
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	// check in ASI form layout editor;
	}

if (specBldgRecd || appMatch("Building/Model/NA/NA")) {
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher","");
	assignTask("Ad Hoc Task Launcher","BackgroundGU");
	}

if (appMatch("Building/Model/NA/NA")) {
	closeTask("Application Intake","Submitted","Application successfully submitted","Closed via script");
	editAppSpecific("applicationExpiration", (dateAddMonths(null,12)));
	}

copyParcelGisObjects();
APO_FUNCTIONS.loadExtraParcelData(capId);
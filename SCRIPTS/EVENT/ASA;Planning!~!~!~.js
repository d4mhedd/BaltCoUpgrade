//ASA;Planning!~!~!~
var recPrclNbrArr = APO_FUNCTIONS.getRecordParcelNumberArr (capId);
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

if (appMatch("Planning/Code Text Amendment/NA/NA")  || appMatch("Planning/Special Actions/NA/NA") || appMatch("Planning/Variance and Modification/NA/NA")) {
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher","");
	assignTask("Ad Hoc Task Launcher","BackgroundGU");
	}

if (!publicUser) {
	APO_FUNCTIONS.loadExtraParcelData(capId);
	}

copyParcelGisObjects();

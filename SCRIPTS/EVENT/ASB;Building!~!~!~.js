//ASB;Building!~!~!~
isMdlRecd=true;
mdlCap=false;
if (!publicUser && matches(appTypeArray[1], "Buildings","ElecMech","Other Structures") && AInfo['siteOffModelPermit']=="Yes") {
	mdlCap = aa.cap.getCapID(AInfo['pimaModel']+"T").getOutput();
	if(!mdlCap) comment("Record entered for the Model Template is invalid: " + AInfo['pimaModel']);
	if(!mdlCap)cancel=true;
	if(!mdlCap) showMessage=true;
	}

if (mdlCap) {
	matchCap = aa.cap.getCap(mdlCap).getOutput();
	matchArray = matchCap.getCapType().toString().split("/");
	if (matchArray[0]!="Building" ||  matchArray[1]!="Model Template" || matchArray[2]!=appTypeArray[1]) isMdlRecd=false;
	}

if (!isMdlRecd) {
	comment("Record is not the correct model type. " + AInfo['pimaModel'] + " is not a(n) " + appTypeArray[1] + " model template.");
	cancel=true;
	}

if (mdlCap && matchCap.getCapStatus().indexOf("Expire") > -1) {
	showMessage=true;
	comment("Model Record "+ AInfo['modelPlanNbr']+ " is expired, so cannot be used." );
	cancel=true;
	}
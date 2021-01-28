//WATUA;Site!Site Construction!NA!NA
FEE_UTILS_MODULE.WTUA_SiteConstructionFees();
if (wfTask=="Revisions" && wfStatus=="In Revision") {
	countChild = 0;
	arrChild = getChildren("Building/Revision/*/*");
	openChild = 0;
	for(x in arrChild) if(!WFMODULE.allTasksCompleteCapId("BP_BUILDINGREVISION",arrChild[x])) openChild +=1;
	if(openChild > 0) comment("A Revisions record is already active on this record.");
	}

if (wfTask=="Revisions" && wfStatus=="In Revision" && openChild == 0) {
	parentCapId = capId;
	var childCap = createChild("Building","Revision","NA","NA",capName+" - Revision");
	DEV_LYNDA_WACHT.revisionsCustomID(childCap);
	capId=childCap;
	closeTask("Application Intake","Submitted","Application successfully submitted","Closed via script");
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher","");
	assignTask("Ad Hoc Task Launcher","BackgroundGU");
	capId = parentCapId;
	}

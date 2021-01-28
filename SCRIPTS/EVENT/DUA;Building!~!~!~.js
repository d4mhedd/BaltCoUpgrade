//DUA;Building!~!~!~
revChgUploaded = false;
var childCapId = false;
if (specBldgRecd && isTaskActive("Admin Review") && allTasksComplete("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher")) {
	assignTask("Admin Review", "AA_DSD_ADMIN");
	}

if ((specBldgRecd || appTypeArray[1]== "Model") && documentModelArray.size() > 0) {
	for(var index = 0;
	index < documentModelArray.size();
	index++) if (documentModelArray.get(index).getDocCategory()=="Revision Plan Set") revChgUploaded = true;
	}

if (revChgUploaded && !UTILITYMODULE.isAdhocTaskActive("Revisions")) {
	UTILITYMODULE.addAdHocTask("ADHOC_WORKFLOW_NAME", "Revisions", null);
	DEV_LYNDA_WACHT.assignAdhocTask("Revisions", "AA_DSD_BUILDING");
	ADHOC_FUNCTIONS.editAdHocTaskDueDate("Revisions", dateAdd(null,1,"Y"));
	}

if (UTILITYMODULE.isAdhocTaskActive("Revisions")) {
	var arrRev = getChildren("Building/Revision/*/*");
	for(x in arrRev) if(DEV_LYNDA_WACHT.isTaskActiveCapId("Application Intake", arrRev[x])) childCapId = arrRev[x];
	}

if (childCapId) {
	currCap = capId;
	capId=childCapId;
	branchTask("Application Intake", "Resubmit", "Updated via script","");
	}

if ((specBldgRecd  || appTypeArray[1] == "Model") && allTasksComplete("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher")&& isTaskActive("Admin Review")&& isTaskStatus("Admin Review", "Deficient")) {
	assignTask("Admin Review","AA_DSD_BUILDING");
	editTaskDueDate("Admin Review", dateAdd(null,1,"Y"));
	}

if ((specBldgRecd || appTypeArray[1] == "Model" ) && UTILITYMODULE.isAdhocTaskActive("Revisions")) {
	parCap = capId;
	revPlanSet = false;
	for (var i = 0;
	i < documentModelArray.size();
	i++) if (documentModelArray.get(i).getDocCategory() =="Revision Plan Set") revPlanSet = true;
	childRecs = getChildren("Building/Revision/*/*");
	for(ii in childRecs) for(i in aa.workflow.getTasks(childRecs[ii]).getOutput()) if( aa.workflow.getTasks(childRecs[ii]).getOutput()[i].getTaskDescription()=="Admin Review" && aa.workflow.getTasks(childRecs[ii]).getOutput()[i].getDisposition()=="Deficient" && aa.workflow.getTasks(childRecs[ii]).getOutput()[i].activeFlag == "Y") capId = (aa.workflow.getTasks(childRecs[ii]).getOutput()[i].getCapID());
	if(revPlanSet && parCap != capId) branch("EMSE:UploadRevisionTaskDoc");
	}

if ((specBldgRecd  || appTypeArray[1] == "Model") && allTasksComplete("ADHOC_WORKFLOW_NAME","Ad Hoc Task Launcher")&& isTaskActive("Application Intake")) {
	branchTask("Application Intake","Resubmit", "Document uploaded", "Update via script");
	}

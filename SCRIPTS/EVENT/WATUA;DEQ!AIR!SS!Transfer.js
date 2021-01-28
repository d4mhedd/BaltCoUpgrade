//WATUA;DEQ!AIR!SS!Transfer
if (wfTask == "Appeal" && wfStatus == "Denied") {
	setTask("Follow Up","N","Y");
	setTask("Technical Review","Y","N");
	var workflowResult = aa.workflow.getTasks(capId);
	wfObj = workflowResult.getOutput();
	for (i in wfObj) if(wfObj[i].getTaskDescription()== "Appeal") procID = wfObj[i].getProcessID();
	closeSubWorkflow(procID,"Completed");
	updateAppStatus("Technical Review","Automatic");
	}

if (wfTask == "Appeal" && wfStatus == "Upheld") {
	setTask("Follow Up","N","Y");
	var workflowResult = aa.workflow.getTasks(capId);
	wfObj = workflowResult.getOutput();
	for (i in wfObj) if(wfObj[i].getTaskDescription()== "Appeal") procID = wfObj[i].getProcessID();
	closeSubWorkflow(procID,"Completed");
	}

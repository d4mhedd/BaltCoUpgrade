//WTUA;Planning!Comp Plan Amendment!NA!NA
if (wfTask=="BOS Hearing" && wfStatus=="Withdrawn") {
	setTask("BOS Hearing", "N", "Y");
	deactivateTask("Resolution");
	activateTask("Close Out");
	}

if (wfTask=="BOS Hearing" && wfStatus=="Denied") {
	setTask("BOS Hearing", "N", "Y");
	deactivateTask("Resolution");
	activateTask("Close Out");
	}

if (wfTask == "Close Out" && wfStatus == "Complete") {
	var workflowResult = aa.workflow.getTasks(capId);
	wfObj = workflowResult.getOutput();
	for (i in wfObj) if(wfObj[i].getTaskDescription()== "Notification") procID = wfObj[i].getProcessID();
	closeSubWorkflow(procID,"Completed");
	}

if (wfTask=="Routing" && wfStatus=="In Review") {
	setTask("Notification", "Y","N");
	}


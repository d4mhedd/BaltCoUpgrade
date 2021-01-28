//ASA;Site!Capacity Letter!NA!NA
updateTask("Application Intake","Submitted","Auto-Submit","Updated via Script");
setTask("Application Intake","N","Y");
setTask("Admin Review","Y","N");
updateAppStatus("Submitted","auto-submit");
editTaskDueDate("Admin Review",dateAdd(null,1,"Y"));
editAppSpecific("formSubmitted", "Yes", capId);
SEWER_CAPACITY.sewerCapacityRecordCreated(capId);
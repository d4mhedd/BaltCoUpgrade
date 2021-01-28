//ASA;Enforcement!Violations!NA!NA
setTask("Intake","N","Y");
setTask("Notifications","Y","N");
closeTask("Intake","Submitted","Auto-Submit","","CV_ENFORCEMENTPROCESS");
updateAppStatus("In Progress","auto-submit");
APO_FUNCTIONS.getSupervisorDistrictofPrimaryParcel(capId);
editTaskDueDate("Intake",dateAdd(new Date(),1,"Y"));
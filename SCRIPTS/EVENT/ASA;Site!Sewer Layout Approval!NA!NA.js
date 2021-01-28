//ASA;Site!Sewer Layout Approval!NA!NA
editAppSpecific("submittalCounter",1);
// intialize the submittal counter. Setting the defauls in ASI config seems to have no effect;
addFee("WW0001","SEWER IMPROVEMENT AND LAYOUT","FINAL",1,"N");
addFee("WW0002","SEWER IMPROVEMENT AND LAYOUT","FINAL",PAGESUBMITTALDETAILS[0]["Number of Pages"],"N");
updateTask("Application Intake","Submitted","Auto-Submit","Updated via Script");
setTask("Application Intake","N","Y");
setTask("Admin Review","Y","N");
updateAppStatus("Submitted","Auto-set");
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions","SW0060", capId);

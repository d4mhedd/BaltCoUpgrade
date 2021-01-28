//ASA;Site!Public Water AOC ATC!NA!NA
closeTask("Application Intake","Submitted","Auto-Submit","","PW_PUBLICWORKSPROCESS");
updateAppStatus("Submitted","auto-submit");
PUBLICWATERMODULE.assessFees(capId);
FEE_UTILS_MODULE.invoiceFees(capId);
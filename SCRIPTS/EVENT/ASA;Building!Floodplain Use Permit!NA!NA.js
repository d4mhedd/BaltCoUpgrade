//ASA;Building!Floodplain Use Permit!NA!NA
setTask("Application Intake","N","Y");
setTask("Review","Y","N");
updateAppStatus("In Review","auto-submit");
editAppSpecific("totalRiparian",APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(capId));
FPUP_FUNCTIONS.recalculateProtectedFields(capId);
var asit = loadASITable("FLOODPLAIN (APO)", capId);
APO_FUNCTIONS.loadFirmPanelData(capId);
FPUP_FUNCTIONS.populateASITDrivenFields(capId);
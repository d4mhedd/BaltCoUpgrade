//PAA;Building!Floodplain Use Permit!NA!NA
editAppSpecific("totalRiparian",APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(capId));
FPUP_FUNCTIONS.recalculateProtectedFields(capId);
APO_FUNCTIONS.loadFirmPanelData(capId);
FPUP_FUNCTIONS.populateASITDrivenFields(capId);

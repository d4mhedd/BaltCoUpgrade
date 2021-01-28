//ASA;Site!Riparian!NA!NA
closeTask("Application Intake","Submitted","Auto-Submit","");
editAppSpecific("totalRiparianOnProperty",APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(capId));
RIPARIAN_FUNCTIONS.recalculateProtectedFields(capId);
editAppSpecific("inLieuFeeAdded","No");
editAppSpecific("mitigationCompleteDateSet","No");
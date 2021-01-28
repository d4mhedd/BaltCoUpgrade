//PAA;Site!Site Construction!NA!NA
editAppSpecific("totalRiparianOnProperty",APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(capId));
RIPARIAN_FUNCTIONS.recalculateProtectedFieldsSC(capId);

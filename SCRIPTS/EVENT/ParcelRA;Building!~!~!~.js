//ParcelRA;Building!~!~!~
if ((typeof capId != "undefined") && (capId != null)) {
	APO_FUNCTIONS.loadExtraParcelData(capId);
	}

if (matches(appTypeArray[1],"Buildings","ElecMech","Manufactured","Other Structures","Site Work","DamageDemo")) {
	editAppSpecific("totalRiparianOnProperty",APO_FUNCTIONS.calculateSumOfNumericASITColumn(capId,"RIPARIAN (APO)","Total Acres"));
	editAppSpecific("riparianType",APO_FUNCTIONS.createCommaDelimitedListOfRiparianTypes(capId));
	RIPARIAN_FUNCTIONS.recalculateProtectedFieldsSC(capId);
	}
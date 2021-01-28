//ASB;Planning!Special Actions!NA!NA
if (AInfo['timeExtension'] != "CHECKED" && AInfo['modificationWaiverOfRezoningCondition'] != "CHECKED" && AInfo['platNoteWaiverModification'] != "CHECKED" && AInfo['lotSplit'] != "CHECKED" && AInfo['modificationWaiverOfConditionsOtherThanOfRezoningOrSpecificPlans'] != "CHECKED" && AInfo['hDZSpecialUse'] != "CHECKED" && AInfo['manufacturedHomeSubdivisionOptions'] != "CHECKED" && AInfo['majorStreetAndScenicRoutesPlanAmendments'] != "CHECKED" && AInfo['majorStreetAndScenicRoutesPlanAmendments'] != "CHECKED" && AInfo['billboardUsePermit'] != "CHECKED" && AInfo['115kVSubstationPermit'] != "CHECKED" && AInfo['waiverOfPlattingRequirement'] != "CHECKED" && AInfo['communityFacilitiesDistrict'] != "CHECKED" && AInfo['other'] != "CHECKED") {
	showMessage=true;
	comment("You did not check one of the required boxes");
	cancel=true;
	}

var zonInfo = new Array();
loadASITablesBefore();
if ((AInfo['115kVSubstationPermit'] == "CHECKED" || AInfo['timeExtension'] == "CHECKED" || AInfo['waiverOfPlattingRequirement'] == "CHECKED") && typeof(ZONINGINFORMATION)!="object") {
	cancel=true;
	showMessage=true;
	comment("Existing and Proposed Zoning are required for this Special Action");
	}

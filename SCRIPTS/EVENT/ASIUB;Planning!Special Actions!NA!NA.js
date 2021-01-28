//ASIUB;Planning!Special Actions!NA!NA
if ((AInfo['115kVSubstationPermit'] == "CHECKED" || AInfo['modificationWaiverOfRezoningCondition'] == "CHECKED" || AInfo['timeExtension'] == "CHECKED" || AInfo['waiverOfPlattingRequirement'] == "CHECKED") && ZONINGINFORMATION.length==0) {
	cancel=true;
	showMessage=true;
	comment("Existing and Proposed Zoning are required for this Special Action");
	}

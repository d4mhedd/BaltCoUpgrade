//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
function updateParent() {
	try{
		var FromappTypeResult = cap.getCapType(); 				//capId.getCapType(); 
		var FromappTypeString = FromappTypeResult.toString(); 	//Convert application type to string ("Building/A/B/C")
		var FromappTypeArray = FromappTypeString.split("/"); 	//Array of application type string
		logDebug("Parent Type= -->>>>>" + FromappTypeArray[3]);

		if (FromappTypeArray[2] == "DRC") {
			updateDRC();
		} else if (FromappTypeArray[2] == "Refinement") {
			updateRefinement();
		} else if (FromappTypeArray[3] == "Material Amendment") {
			updateMaterialAmendment();
		} else {
			logDebug("No rule to update parent subtype: " + FromappTypeArray[2]);
			return false;
		}
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function updateParent: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end
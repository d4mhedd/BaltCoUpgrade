//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
function updateRefinement() {
	try{
		//Get the source cap
		var pFromCapID = capId;
		var pToCapId = getParent(pFromCapID);

		//get the parent cap type
		var cap2 = aa.cap.getCap(pToCapId).getOutput(); // Cap object
		var AppType = cap2.getCapType();
		var AppTypeString = AppType.toString();
		var AppTypeArray = AppTypeString.split("/");

		logDebug("Refinement-pFromCapID=" + pFromCapID + "----pToCapId=" + pToCapId + "-- AppTypeArray[3]:" + AppTypeArray[3]);

		//copy contacts if parent's type is Current
		if (AppTypeArray[3] == "Current") {
			// Copy Contacts
			deleteCopyContacts(pFromCapID, pToCapId);
		}
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function updateRefinement: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end
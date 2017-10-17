//custom function
//jec 171016 conversion begin
//formerly UPDATEORIGFROMAMEND
function updateOrigFromAmend(){
	try{
		var showMessage = true; // Set to true to see results in popup window
		/* Defer to session variables - these are redundant
		var showDebug = false; // Set to true to see debug messages in popup window
		var startDate = new Date();
		var startTime = startDate.getTime();
		var message = ""; // Message String
		var debug = ""; // Debug String
		var br = "<BR>"; // Break Tag
		var capId = getCapId(); //getCapId(); // // CapId object
		*/
		
		var originalCap = getParent(capId);

		if (originalCap != false){
			addressModel = getAddress4AssociatedForms(capId);  	//returns false if no addresses or the first on the cap
			parcelModel = getParcel4AssociatedForms(capId);		//returns false if no parcel or the first on the cap
			ownerModel = getOwner4AssociatedForms(capId);		//returns false if no owner or the first on the cap
			updateParent();
		}
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function updateOrigFromAmend: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end
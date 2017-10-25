//custom function
//jec 171025 conversion begin
//formerly RUNREPORT
function runPetLicenseReport(){
	try{
		pCapId = capId;
		
		if (arguments.length == 1) {
			pCapId = arguments[0]; //Optional capId specification
		}
		
		if (appTypeArray[0] == "License" && appTypeArray[2] == "Pet"){
			var capIDString = pCapId.getCustomID();
			var reptMessage = runReportAttach(pCapId,"Animal License Certificate","ALTID",capIDString);
			logDebug(reptMessage);
		}else{
			logDebug("This record type is not designed for the Animal License Certificate");
			return false;
		}
	}catch (err){
		logDebug("A JavaScript Error occured in custom function runPetLicenseReport: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171025 conversion begin
//custom function
//jec 171020 conversion begin
function runPetLicenseReport() {
	try {
		pCapId = capId;

		if (arguments.length == 1) {
			pCapId = arguments[0]; //Optional capId specification
		}

		if (appTypeArray[0] == "License" && appTypeArray[2] == "Pet") {
			//var capIDString = pCapId.getCustomID();
			//runReportAttach(pCapId, "Animal License Certificate", "ALTID", capIDString);
			runReportPrint("Animal License Certificate", pCapId);
			logDebug("Report Successfully Generated.");
		} else {
			logDebug("This record type is not designed for the Animal License Certificate");
		}
	} catch (err) {
		logDebug("A JavaScript Error occured in custom function runPetLicenseReport: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171030 conversion end
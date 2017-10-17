//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
function loadAppSpecific(thisArr, itemCap) {
	try {
		
		//
		// Returns an associative array of App Specific Info
		// Optional second parameter, cap ID to load from
		//

		//var itemCap = capId;
		if (arguments.length == 2)
			itemCap = arguments[1]; // use cap ID specified in args


		var appSpecInfoResult = aa.appSpecificInfo.getByCapID(itemCap);
		if (appSpecInfoResult.getSuccess()) {

			var fAppSpecInfoObj = appSpecInfoResult.getOutput();

			for (loopk in fAppSpecInfoObj) {

				//FA 09/25/2012 exclude group APFO SCHOOL INFORMATION
				if (fAppSpecInfoObj[loopk].getCheckboxType() == "PROJECT INFORMATION" || fAppSpecInfoObj[loopk].getCheckboxType() == "ADDITIONAL PARCEL INFORMATION") {
					//FA 09/25/2012 exclude field PAI Number
					if (fAppSpecInfoObj[loopk].checkboxDesc == "PAI Number") {
						//logDebug( "fAppSpecInfoObj[loopk].checkboxDesc:" + fAppSpecInfoObj[loopk].checkboxDesc);
					} else {

						if (useAppSpecificGroupName) {
							thisArr[fAppSpecInfoObj[loopk].getCheckboxType() + "." + fAppSpecInfoObj[loopk].checkboxDesc] = fAppSpecInfoObj[loopk].checklistComment;
						} else {

							thisArr[fAppSpecInfoObj[loopk].checkboxDesc] = fAppSpecInfoObj[loopk].checklistComment;
						}
					}
				}
			}
		}

	} catch (err) {
		logDebug("A JavaScript Error occured in custom function loadAppSpecific: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end